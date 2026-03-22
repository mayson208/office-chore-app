package com.officechores.ui;

import com.officechores.model.Chore;
import com.officechores.model.RecurrenceType;
import com.officechores.model.User;
import com.officechores.service.ChoreService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.IntegerField;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.timepicker.TimePicker;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.Locale;

public class ChoreFormDialog extends Dialog {

    public ChoreFormDialog(Chore chore, User currentUser, ChoreService choreService, Runnable onSave) {
        boolean isNew = chore.getId() == null;
        setWidth("480px");
        setDraggable(true);

        H3 header = new H3(isNew ? "New Chore" : "Edit Chore");

        TextField nameField = new TextField("Chore Name");
        nameField.setRequired(true);
        nameField.setWidthFull();
        nameField.setValue(chore.getName() != null ? chore.getName() : "");

        TextArea descField = new TextArea("Description (optional)");
        descField.setWidthFull();
        descField.setValue(chore.getDescription() != null ? chore.getDescription() : "");

        TextArea notesField = new TextArea("Notes (optional)");
        notesField.setWidthFull();
        notesField.setValue(chore.getNotes() != null ? chore.getNotes() : "");

        Select<RecurrenceType> recurrenceSelect = new Select<>();
        recurrenceSelect.setLabel("Recurrence");
        recurrenceSelect.setItems(RecurrenceType.values());
        recurrenceSelect.setItemLabelGenerator(rt -> switch (rt) {
            case NONE -> "None (one-time)";
            case DAILY -> "Daily";
            case WEEKLY -> "Weekly";
            case MONTHLY -> "Monthly";
        });
        recurrenceSelect.setValue(chore.getRecurrenceType() != null ? chore.getRecurrenceType() : RecurrenceType.NONE);
        recurrenceSelect.setWidthFull();

        ComboBox<DayOfWeek> dayOfWeekSelect = new ComboBox<>("Day of Week");
        dayOfWeekSelect.setItems(DayOfWeek.values());
        dayOfWeekSelect.setItemLabelGenerator(d -> d.getDisplayName(TextStyle.FULL, Locale.getDefault()));
        dayOfWeekSelect.setWidthFull();
        dayOfWeekSelect.setVisible(false);
        if (chore.getRecurrenceDayOfWeek() != null) {
            dayOfWeekSelect.setValue(DayOfWeek.of(chore.getRecurrenceDayOfWeek()));
        }

        IntegerField dayOfMonthField = new IntegerField("Day of Month (1-28)");
        dayOfMonthField.setMin(1);
        dayOfMonthField.setMax(28);
        dayOfMonthField.setWidthFull();
        dayOfMonthField.setVisible(false);
        if (chore.getRecurrenceDayOfMonth() != null) {
            dayOfMonthField.setValue(chore.getRecurrenceDayOfMonth());
        }

        TimePicker timePicker = new TimePicker("Time Due");
        timePicker.setWidthFull();
        timePicker.setValue(chore.getRecurrenceTime() != null ? chore.getRecurrenceTime() : LocalTime.of(9, 0));

        // Show/hide extra fields based on recurrence
        updateRecurrenceFields(recurrenceSelect.getValue(), dayOfWeekSelect, dayOfMonthField);
        recurrenceSelect.addValueChangeListener(e ->
                updateRecurrenceFields(e.getValue(), dayOfWeekSelect, dayOfMonthField));

        Button saveBtn = new Button("Save", e -> {
            if (nameField.getValue().isBlank()) {
                Notification.show("Chore name is required.", 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            chore.setName(nameField.getValue().trim());
            chore.setDescription(descField.getValue().isBlank() ? null : descField.getValue().trim());
            chore.setNotes(notesField.getValue().isBlank() ? null : notesField.getValue().trim());
            chore.setRecurrenceType(recurrenceSelect.getValue());
            chore.setRecurrenceTime(timePicker.getValue());

            if (recurrenceSelect.getValue() == RecurrenceType.WEEKLY && dayOfWeekSelect.getValue() != null) {
                chore.setRecurrenceDayOfWeek(dayOfWeekSelect.getValue().getValue());
            } else {
                chore.setRecurrenceDayOfWeek(null);
            }

            if (recurrenceSelect.getValue() == RecurrenceType.MONTHLY && dayOfMonthField.getValue() != null) {
                chore.setRecurrenceDayOfMonth(dayOfMonthField.getValue());
            } else {
                chore.setRecurrenceDayOfMonth(null);
            }

            try {
                if (isNew) {
                    choreService.createChore(chore, currentUser);
                } else {
                    choreService.updateChore(chore);
                }
                Notification.show("Chore saved!", 2000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                close();
                onSave.run();
            } catch (Exception ex) {
                Notification.show("Error saving: " + ex.getMessage(), 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
        });
        saveBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button cancelBtn = new Button("Cancel", e -> close());
        cancelBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        HorizontalLayout footer = new HorizontalLayout(cancelBtn, saveBtn);
        footer.setWidthFull();
        footer.setJustifyContentMode(com.vaadin.flow.component.orderedlayout.FlexComponent.JustifyContentMode.END);

        VerticalLayout content = new VerticalLayout(header, nameField, descField, notesField,
                recurrenceSelect, dayOfWeekSelect, dayOfMonthField, timePicker, footer);
        content.setSpacing(true);
        content.setPadding(false);

        add(content);
    }

    private void updateRecurrenceFields(RecurrenceType type, ComboBox<?> dayOfWeek, IntegerField dayOfMonth) {
        dayOfWeek.setVisible(type == RecurrenceType.WEEKLY);
        dayOfMonth.setVisible(type == RecurrenceType.MONTHLY);
    }
}
