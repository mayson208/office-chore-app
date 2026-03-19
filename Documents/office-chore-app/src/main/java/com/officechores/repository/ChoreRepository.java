package com.officechores.repository;

import com.officechores.model.Chore;
import com.officechores.model.RecurrenceType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChoreRepository extends JpaRepository<Chore, Long> {
    List<Chore> findAllByActiveTrue();
    List<Chore> findAllByActiveTrueAndRecurrenceTypeNot(RecurrenceType recurrenceType);
}
