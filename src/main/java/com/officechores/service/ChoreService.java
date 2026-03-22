package com.officechores.service;

import com.officechores.model.Chore;
import com.officechores.model.RecurrenceType;
import com.officechores.model.User;
import com.officechores.repository.ChoreRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ChoreService {

    private final ChoreRepository choreRepository;
    private final ChoreInstanceService choreInstanceService;

    public ChoreService(ChoreRepository choreRepository, ChoreInstanceService choreInstanceService) {
        this.choreRepository = choreRepository;
        this.choreInstanceService = choreInstanceService;
    }

    @Transactional
    public Chore createChore(Chore chore, User createdBy) {
        chore.setCreatedBy(createdBy);
        chore = choreRepository.save(chore);
        if (chore.getRecurrenceType() != RecurrenceType.NONE) {
            choreInstanceService.generateUpcomingInstances(chore, 4);
        }
        return chore;
    }

    @Transactional
    public Chore updateChore(Chore chore) {
        return choreRepository.save(chore);
    }

    @Transactional
    public void deactivateChore(Long choreId) {
        Chore chore = choreRepository.findById(choreId)
                .orElseThrow(() -> new IllegalArgumentException("Chore not found"));
        chore.setActive(false);
        choreRepository.save(chore);
    }

    @Transactional
    public void reactivateChore(Long choreId) {
        Chore chore = choreRepository.findById(choreId)
                .orElseThrow(() -> new IllegalArgumentException("Chore not found"));
        chore.setActive(true);
        choreRepository.save(chore);
    }

    public Optional<Chore> findById(Long id) {
        return choreRepository.findById(id);
    }

    public List<Chore> findAllActive() {
        return choreRepository.findAllByActiveTrue();
    }

    public List<Chore> findAll() {
        return choreRepository.findAll();
    }

    public List<Chore> findAllActiveRecurring() {
        return choreRepository.findAllByActiveTrueAndRecurrenceTypeNot(RecurrenceType.NONE);
    }
}
