package com.officechores.ui;

import com.officechores.model.User;
import com.officechores.service.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

@Route(value = "profile", layout = MainLayout.class)
@PageTitle("My Profile | Office Chores")
@PermitAll
public class ProfileView extends VerticalLayout {

    private final UserService userService;

    public ProfileView(UserService userService) {
        this.userService = userService;

        User user = SecurityUtils.getCurrentUser(userService).orElseThrow();

        H2 heading = new H2("My Profile");

        TextField nameField = new TextField("Display Name");
        nameField.setValue(user.getDisplayName());
        nameField.setWidth("320px");

        EmailField emailField = new EmailField("Email");
        emailField.setValue(user.getEmail());
        emailField.setReadOnly(true);
        emailField.setWidth("320px");

        PasswordField newPasswordField = new PasswordField("New Password");
        newPasswordField.setHelperText("Leave blank to keep current password");
        newPasswordField.setWidth("320px");

        PasswordField confirmPasswordField = new PasswordField("Confirm New Password");
        confirmPasswordField.setWidth("320px");

        Checkbox notifCheckbox = new Checkbox("Receive email reminders", user.isEmailNotificationsEnabled());

        Button saveBtn = new Button("Save Changes", e -> {
            if (nameField.getValue().isBlank()) {
                Notification.show("Display name cannot be empty.", 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            String newPass = newPasswordField.getValue();
            if (!newPass.isBlank() && !newPass.equals(confirmPasswordField.getValue())) {
                Notification.show("Passwords do not match.", 3000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            userService.updateUser(user.getId(), nameField.getValue().trim(),
                    user.getRole(), notifCheckbox.getValue());

            if (!newPass.isBlank()) {
                userService.changePassword(user.getId(), newPass);
                newPasswordField.clear();
                confirmPasswordField.clear();
            }

            Notification.show("Profile updated!", 2000, Notification.Position.TOP_CENTER)
                    .addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        });
        saveBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        add(heading, nameField, emailField, newPasswordField, confirmPasswordField, notifCheckbox, saveBtn);
        setMaxWidth("600px");
        setPadding(true);
    }
}
