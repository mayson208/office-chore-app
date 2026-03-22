package com.officechores.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
public class Chore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(length = 1000)
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RecurrenceType recurrenceType = RecurrenceType.NONE;

    private Integer recurrenceDayOfWeek;
    private Integer recurrenceDayOfMonth;
    private LocalTime recurrenceTime = LocalTime.of(9, 0);
    private boolean active = true;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    private User createdBy;

    public Chore() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public RecurrenceType getRecurrenceType() { return recurrenceType; }
    public void setRecurrenceType(RecurrenceType recurrenceType) { this.recurrenceType = recurrenceType; }
    public Integer getRecurrenceDayOfWeek() { return recurrenceDayOfWeek; }
    public void setRecurrenceDayOfWeek(Integer recurrenceDayOfWeek) { this.recurrenceDayOfWeek = recurrenceDayOfWeek; }
    public Integer getRecurrenceDayOfMonth() { return recurrenceDayOfMonth; }
    public void setRecurrenceDayOfMonth(Integer recurrenceDayOfMonth) { this.recurrenceDayOfMonth = recurrenceDayOfMonth; }
    public LocalTime getRecurrenceTime() { return recurrenceTime; }
    public void setRecurrenceTime(LocalTime recurrenceTime) { this.recurrenceTime = recurrenceTime; }
    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public User getCreatedBy() { return createdBy; }
    public void setCreatedBy(User createdBy) { this.createdBy = createdBy; }
}
