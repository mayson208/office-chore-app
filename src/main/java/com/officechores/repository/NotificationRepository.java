package com.officechores.repository;

import com.officechores.model.ChoreInstance;
import com.officechores.model.Notification;
import com.officechores.model.NotificationType;
import com.officechores.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    boolean existsByRecipientAndChoreInstanceAndType(User recipient, ChoreInstance choreInstance, NotificationType type);
    List<Notification> findByChoreInstanceAndType(ChoreInstance choreInstance, NotificationType type);
}
