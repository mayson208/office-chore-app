package com.officechores.repository;

import com.officechores.model.Chore;
import com.officechores.model.ChoreInstance;
import com.officechores.model.ChoreStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ChoreInstanceRepository extends JpaRepository<ChoreInstance, Long> {

    List<ChoreInstance> findByScheduledDateBetween(LocalDate start, LocalDate end);

    List<ChoreInstance> findByStatusAndScheduledDateBefore(ChoreStatus status, LocalDate date);

    List<ChoreInstance> findByStatusAndScheduledDate(ChoreStatus status, LocalDate date);

    Optional<ChoreInstance> findByChoreAndScheduledDate(Chore chore, LocalDate date);

    @Query("SELECT ci FROM ChoreInstance ci WHERE ci.status = :status AND ci.scheduledDate = :date AND ci.reminderSentAt IS NULL")
    List<ChoreInstance> findPendingInstancesForReminderOnDate(@Param("status") ChoreStatus status, @Param("date") LocalDate date);

    @Query("SELECT MAX(ci.scheduledDate) FROM ChoreInstance ci WHERE ci.chore = :chore")
    Optional<LocalDate> findMaxScheduledDateForChore(@Param("chore") Chore chore);
}
