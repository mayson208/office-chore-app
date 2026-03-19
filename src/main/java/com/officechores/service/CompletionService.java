package com.officechores.service;

import com.officechores.model.CompletionRecord;
import com.officechores.model.User;
import com.officechores.repository.CompletionRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CompletionService {

    private final CompletionRecordRepository completionRecordRepository;

    public CompletionService(CompletionRecordRepository completionRecordRepository) {
        this.completionRecordRepository = completionRecordRepository;
    }

    @Transactional
    public CompletionRecord save(CompletionRecord record) {
        return completionRecordRepository.save(record);
    }

    public Optional<CompletionRecord> findByInstanceId(Long instanceId) {
        return completionRecordRepository.findByChoreInstanceId(instanceId);
    }

    public List<CompletionRecord> findAll() {
        return completionRecordRepository.findAllByOrderByCompletedAtDesc();
    }

    public List<CompletionRecord> findByDateRange(LocalDateTime from, LocalDateTime to) {
        return completionRecordRepository.findByCompletedAtBetweenOrderByCompletedAtDesc(from, to);
    }

    public List<CompletionRecord> findByUser(User user) {
        return completionRecordRepository.findByCompletedByOrderByCompletedAtDesc(user);
    }
}
