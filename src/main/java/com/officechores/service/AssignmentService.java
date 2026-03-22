package com.officechores.service;

import com.officechores.model.Assignment;
import com.officechores.model.ChoreInstance;
import com.officechores.model.User;
import com.officechores.repository.AssignmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final NotificationService notificationService;

    public AssignmentService(AssignmentRepository assignmentRepository, NotificationService notificationService) {
        this.assignmentRepository = assignmentRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public void assignUsersToInstance(ChoreInstance instance, List<User> users, User assignedBy) {
        assignmentRepository.deleteByChoreInstance(instance);
        for (User user : users) {
            Assignment assignment = new Assignment(instance, user, assignedBy);
            assignmentRepository.save(assignment);
            try { notificationService.sendAssignmentEmail(user, instance); } catch (Exception ignored) {}
        }
    }

    public List<User> getAssigneesForInstance(ChoreInstance instance) {
        return assignmentRepository.findByChoreInstance(instance)
                .stream()
                .map(Assignment::getUser)
                .collect(Collectors.toList());
    }

    public List<ChoreInstance> getInstancesAssignedToUser(User user) {
        return assignmentRepository.findByUser(user)
                .stream()
                .map(Assignment::getChoreInstance)
                .collect(Collectors.toList());
    }

    public boolean isUserAssigned(ChoreInstance instance, User user) {
        return assignmentRepository.findByChoreInstance(instance)
                .stream()
                .anyMatch(a -> a.getUser().getId().equals(user.getId()));
    }
}
