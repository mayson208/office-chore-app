package com.officechores.ui;

import com.officechores.model.User;
import com.officechores.model.UserRole;
import com.officechores.service.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.select.Select;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;

public class UserFormDialog extends Dialog {

    public UserFormDialog(User user, UserService userService, Runnable onSave) {
        boolean isNew = user.getId() == null;
        setWidth("420px");
        setDraggable(true);

        H3 header = new H3(isNew ? "Add Team Member" : "Edit Team Member");

        TextField nameField = new TextField("Display Name");
        nameField.setRequired(true);
        nameField.setWidthFull();
        nameField.setValue(user.getDisplayName() != null ? user.getDisplayName() : "");

        EmailField emailField = new EmailField("Email");
        emailField.setRequired(true);
        emailField.setWidthFull();
        emailField.setValue(user.getEmail() != null ? user.getEmail() : "");
        emailField.setReadOnly(!isNew); // Email can't be changed after creation

        PasswordField passwordField = new PasswordField(isNew ? "Password" : "New Password (leave blank to keep current)");
        passwordField.setWidthFull();
        if (isNew) passwordField.setRequired(true);

        Select<UserRole> roleSelect = new Select<>();
        roleSelect.setLabel("Role");
        roleSelect.setItems(UserRole.values());
        roleSelect.setItemLabelGenerator(r -> r == UserRole.ADMIN ? "Admin" : "User");
        roleSelect.setValue(user.getRole() != null ? user.getRole() : UserRole.USER);
        roleSelect.setWidthFull();

        Checkbox notifCheckbox = new Checkbox("Receive email notifications", user.isEmailNotificationsEnabled());

        Button saveBtn = new Button("Save", e -> {
            if (nameField.getValue().isBlank()) {
                Notification.show("Display name is required.", 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }
            if (isNew && emailField.getValue().isBlank()) {
                Notification.show("Email is required.", 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }
            if (isNew && passwordField.getValue().isBlank()) {
                Notification.show("Password is required for new users.", 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            try {
                if (isNew) {
                    userService.createUser(emailField.getValue().trim(),
                            passwordField.getValue(),
                            nameField.getValue().trim(),
                            roleSelect.getValue());
                } else {
                    userService.updateUser(user.getId(),
                            nameField.getValue().trim(),
                            roleSelect.getValue(),
                            notifCheckbox.getValue());
                    if (!passwordField.getValue().isBlank()) {
                        userService.changePassword(user.getId(), passwordField.getValue());
                    }
                }
                Notification.show("User saved!", 2000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
                close();
                onSave.run();
            } catch (Exception ex) {
                Notification.show("Error: " + ex.getMessage(), 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
            }
        });
        saveBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button cancelBtn = new Button("Cancel", e -> close());
        cancelBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        HorizontalLayout footer = new HorizontalLayout(cancelBtn, saveBtn);
        footer.setWidthFull();
        footer.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        VerticalLayout content = new VerticalLayout(header, nameField, emailField,
                passwordField, roleSelect, notifCheckbox, footer);
        content.setSpacing(true);
        content.setPadding(false);
        add(content);
    }
}
