package com.officechores.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class CompletionRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    private ChoreInstance choreInstance;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User completedBy;

    @Column(nullable = false)
    private LocalDateTime completedAt = LocalDateTime.now();

    @Column(length = 1000)
    private String comment;

    public CompletionRecord() {}

    public CompletionRecord(ChoreInstance choreInstance, User completedBy, String comment) {
        this.choreInstance = choreInstance;
        this.completedBy = completedBy;
        this.comment = comment;
    }

    public Long getId() { return id; }
    public ChoreInstance getChoreInstance() { return choreInstance; }
    public void setChoreInstance(ChoreInstance choreInstance) { this.choreInstance = choreInstance; }
    public User getCompletedBy() { return completedBy; }
    public void setCompletedBy(User completedBy) { this.completedBy = completedBy; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}
