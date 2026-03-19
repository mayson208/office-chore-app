package com.officechores.repository;

import com.officechores.model.CompletionRecord;
import com.officechores.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CompletionRecordRepository extends JpaRepository<CompletionRecord, Long> {
    Optional<CompletionRecord> findByChoreInstanceId(Long choreInstanceId);
    List<CompletionRecord> findByCompletedAtBetweenOrderByCompletedAtDesc(LocalDateTime from, LocalDateTime to);
    List<CompletionRecord> findByCompletedByOrderByCompletedAtDesc(User user);
    List<CompletionRecord> findAllByOrderByCompletedAtDesc();
}
