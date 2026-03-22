package com.officechores.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"chore_instance_id", "user_id"}))
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "chore_instance_id")
    private ChoreInstance choreInstance;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private LocalDateTime assignedAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    private User assignedBy;

    public Assignment() {}

    public Assignment(ChoreInstance choreInstance, User user, User assignedBy) {
        this.choreInstance = choreInstance;
        this.user = user;
        this.assignedBy = assignedBy;
    }

    public Long getId() { return id; }
    public ChoreInstance getChoreInstance() { return choreInstance; }
    public void setChoreInstance(ChoreInstance choreInstance) { this.choreInstance = choreInstance; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getAssignedAt() { return assignedAt; }
    public User getAssignedBy() { return assignedBy; }
    public void setAssignedBy(User assignedBy) { this.assignedBy = assignedBy; }
}
