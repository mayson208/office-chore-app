package com.officechores.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User recipient;

    @ManyToOne(fetch = FetchType.LAZY)
    private ChoreInstance choreInstance;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NotificationType type;

    @Column(nullable = false)
    private LocalDateTime sentAt = LocalDateTime.now();

    private boolean success;

    public Notification() {}

    public Notification(User recipient, ChoreInstance choreInstance, NotificationType type, boolean success) {
        this.recipient = recipient;
        this.choreInstance = choreInstance;
        this.type = type;
        this.success = success;
    }

    public Long getId() { return id; }
    public User getRecipient() { return recipient; }
    public void setRecipient(User recipient) { this.recipient = recipient; }
    public ChoreInstance getChoreInstance() { return choreInstance; }
    public void setChoreInstance(ChoreInstance choreInstance) { this.choreInstance = choreInstance; }
    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }
    public LocalDateTime getSentAt() { return sentAt; }
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
}
