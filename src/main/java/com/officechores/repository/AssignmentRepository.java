package com.officechores.repository;

import com.officechores.model.Assignment;
import com.officechores.model.ChoreInstance;
import com.officechores.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByChoreInstance(ChoreInstance choreInstance);
    List<Assignment> findByUser(User user);
    void deleteByChoreInstance(ChoreInstance choreInstance);
}
