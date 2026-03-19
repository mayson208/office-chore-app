package com.officechores.ui;

import com.officechores.model.*;
import com.officechores.service.AssignmentService;
import com.officechores.service.ChoreInstanceService;
import com.officechores.service.CompletionService;
import com.officechores.service.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.CheckboxGroup;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class ChoreDetailDialog extends Dialog {

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy");
    private static final DateTimeFormatter TIME_FMT = DateTimeFormatter.ofPattern("h:mm a");
    private static final DateTimeFormatter DATETIME_FMT = DateTimeFormatter.ofPattern("MMM d, yyyy 'at' h:mm a");

    public ChoreDetailDialog(ChoreInstance instance,
                              User currentUser,
                              ChoreInstanceService choreInstanceService,
                              AssignmentService assignmentService,
                              CompletionService completionService,
                              UserService userService,
                              Runnable onRefresh) {

        setWidth("500px");
        setDraggable(true);

        Chore chore = instance.getChore();
        List<User> assignees = assignmentService.getAssigneesForInstance(instance);
        Optional<CompletionRecord> completionRecord = completionService.findByInstanceId(instance.getId());
        boolean isAdmin = SecurityUtils.isAdmin();
        boolean isAssigned = assignees.stream().anyMatch(u -> u.getId().equals(currentUser.getId()));

        // Header
        H3 title = new H3(chore.getName());

        // Status badge
        Span statusBadge = new Span(instance.getStatus().name());
        statusBadge.getStyle().set("padding", "2px 8px").set("border-radius", "4px").set("font-size", "0.8em").set("font-weight", "bold");
        switch (instance.getStatus()) {
            case OVERDUE -> statusBadge.getStyle().set("background", "#ffebee").set("color", "#c62828");
            case COMPLETED -> statusBadge.getStyle().set("background", "#f5f5f5").set("color", "#616161");
            default -> statusBadge.getStyle().set("background", "#e8f5e9").set("color", "#2e7d32");
        }

        HorizontalLayout titleRow = new HorizontalLayout(title, statusBadge);
        titleRow.setDefaultVerticalComponentAlignment(FlexComponent.Alignment.CENTER);

        // Details
        VerticalLayout details = new VerticalLayout();
        details.setSpacing(false);
        details.setPadding(false);

        String dueText = instance.getScheduledDate().format(DATE_FMT);
        if (instance.getScheduledTime() != null) dueText += " at " + instance.getScheduledTime().format(TIME_FMT);
        details.add(new Paragraph("Due: " + dueText));

        String assigneeText = assignees.isEmpty() ? "Unassigned"
                : assignees.stream().map(User::getDisplayName).collect(Collectors.joining(", "));
        details.add(new Paragraph("Assigned to: " + assigneeText));

        if (chore.getDescription() != null && !chore.getDescription().isBlank()) {
            details.add(new Paragraph("Description: " + chore.getDescription()));
        }
        if (chore.getNotes() != null && !chore.getNotes().isBlank()) {
            details.add(new Paragraph("Notes: " + chore.getNotes()));
        }
        if (instance.getNotes() != null && !instance.getNotes().isBlank()) {
            details.add(new Paragraph("Instance notes: " + instance.getNotes()));
        }

        if (completionRecord.isPresent()) {
            CompletionRecord rec = completionRecord.get();
            details.add(new Paragraph("Completed by: " + rec.getCompletedBy().getDisplayName()
                    + " on " + rec.getCompletedAt().format(DATETIME_FMT)));
            if (rec.getComment() != null && !rec.getComment().isBlank()) {
                details.add(new Paragraph("Completion note: " + rec.getComment()));
            }
        }

        // Complete section
        TextArea completionNote = new TextArea("Completion note (optional)");
        completionNote.setWidth("100%");

        Button markDoneBtn = new Button("Mark as Done");
        markDoneBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY, ButtonVariant.LUMO_SUCCESS);
        markDoneBtn.addClickListener(e -> {
            try {
                CompletionRecord record = choreInstanceService.complete(instance.getId(), currentUser, completionNote.getValue());
                completionService.save(record);
                Notification.show("Chore marked as done!", 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                close();
                onRefresh.run();
            } catch (Exception ex) {
                Notification.show("Error: " + ex.getMessage(), 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
        });

        // Reassign section (admin only)
        VerticalLayout reassignSection = new VerticalLayout();
        reassignSection.setSpacing(false);
        reassignSection.setPadding(false);
        reassignSection.setVisible(isAdmin && instance.getStatus() != ChoreStatus.COMPLETED);

        if (isAdmin && instance.getStatus() != ChoreStatus.COMPLETED) {
            H4 reassignHeader = new H4("Reassign");
            List<User> allUsers = userService.findAllActive();
            Set<User> currentAssignees = Set.copyOf(assignees);

            CheckboxGroup<User> userCheckboxes = new CheckboxGroup<>();
            userCheckboxes.setItems(allUsers);
            userCheckboxes.setItemLabelGenerator(User::getDisplayName);
            userCheckboxes.setValue(currentAssignees);

            Button saveAssignmentBtn = new Button("Save Assignments");
            saveAssignmentBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
            saveAssignmentBtn.addClickListener(e -> {
                List<User> selected = List.copyOf(userCheckboxes.getValue());
                assignmentService.assignUsersToInstance(instance, selected, currentUser);
                Notification.show("Assignments saved!", 2000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                close();
                onRefresh.run();
            });

            reassignSection.add(reassignHeader, userCheckboxes, saveAssignmentBtn);
        }

        // Footer buttons
        Button closeBtn = new Button("Close", e -> close());
        closeBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        HorizontalLayout footer = new HorizontalLayout(closeBtn);
        footer.setWidthFull();

        VerticalLayout content = new VerticalLayout(titleRow, details);
        if (instance.getStatus() != ChoreStatus.COMPLETED && (isAssigned || isAdmin)) {
            content.add(completionNote, markDoneBtn);
        }
        if (isAdmin) {
            content.add(reassignSection);
        }
        content.add(footer);
        content.setPadding(false);

        add(content);
    }
}
