package com.officechores.service;

import com.officechores.model.*;
import com.officechores.repository.ChoreInstanceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChoreInstanceService {

    private final ChoreInstanceRepository choreInstanceRepository;
    private final RecurrenceService recurrenceService;

    public ChoreInstanceService(ChoreInstanceRepository choreInstanceRepository, RecurrenceService recurrenceService) {
        this.choreInstanceRepository = choreInstanceRepository;
        this.recurrenceService = recurrenceService;
    }

    @Transactional
    public void generateUpcomingInstances(Chore chore, int weeksAhead) {
        LocalDate today = LocalDate.now();
        LocalDate generateUntil = today.plusWeeks(weeksAhead);

        Optional<LocalDate> lastDate = choreInstanceRepository.findMaxScheduledDateForChore(chore);
        LocalDate fromDate = lastDate.map(d -> d.plusDays(1)).orElse(today);

        List<LocalDate> dates = recurrenceService.getOccurrencesBetween(chore, fromDate, generateUntil);
        for (LocalDate date : dates) {
            if (choreInstanceRepository.findByChoreAndScheduledDate(chore, date).isEmpty()) {
                ChoreInstance instance = new ChoreInstance();
                instance.setChore(chore);
                instance.setScheduledDate(date);
                instance.setScheduledTime(chore.getRecurrenceTime());
                instance.setStatus(ChoreStatus.PENDING);
                choreInstanceRepository.save(instance);
            }
        }
    }

    @Transactional
    public void reschedule(Long instanceId, LocalDate newDate) {
        ChoreInstance instance = choreInstanceRepository.findById(instanceId)
                .orElseThrow(() -> new IllegalArgumentException("Chore instance not found"));
        if (instance.getStatus() == ChoreStatus.COMPLETED) {
            throw new IllegalStateException("Cannot reschedule a completed chore.");
        }
        instance.setScheduledDate(newDate);
        if (!newDate.isBefore(LocalDate.now()) && instance.getStatus() == ChoreStatus.OVERDUE) {
            instance.setStatus(ChoreStatus.PENDING);
        }
        choreInstanceRepository.save(instance);
    }

    @Transactional
    public CompletionRecord complete(Long instanceId, User completedBy, String comment) {
        ChoreInstance instance = choreInstanceRepository.findById(instanceId)
                .orElseThrow(() -> new IllegalArgumentException("Chore instance not found"));
        if (instance.getStatus() == ChoreStatus.COMPLETED) {
            throw new IllegalStateException("This chore is already completed.");
        }
        instance.setStatus(ChoreStatus.COMPLETED);
        choreInstanceRepository.save(instance);
        return new CompletionRecord(instance, completedBy, comment);
    }

    public List<ChoreInstance> getInstancesForRange(LocalDate start, LocalDate end) {
        return choreInstanceRepository.findByScheduledDateBetween(start, end);
    }

    public List<ChoreInstance> findOverdueInstances() {
        return choreInstanceRepository.findByStatusAndScheduledDateBefore(ChoreStatus.PENDING, LocalDate.now());
    }

    public List<ChoreInstance> findPendingInstancesForReminder(LocalDate date) {
        return choreInstanceRepository.findPendingInstancesForReminderOnDate(ChoreStatus.PENDING, date);
    }

    @Transactional
    public void markOverdue(ChoreInstance instance) {
        instance.setStatus(ChoreStatus.OVERDUE);
        choreInstanceRepository.save(instance);
    }

    @Transactional
    public void markReminderSent(ChoreInstance instance) {
        instance.setReminderSentAt(LocalDateTime.now());
        choreInstanceRepository.save(instance);
    }

    public Optional<ChoreInstance> findById(Long id) {
        return choreInstanceRepository.findById(id);
    }
}
