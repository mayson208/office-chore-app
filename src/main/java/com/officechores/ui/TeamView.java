package com.officechores.ui;

import com.officechores.model.User;
import com.officechores.service.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;

@Route(value = "team", layout = MainLayout.class)
@PageTitle("Team | Office Chores")
@RolesAllowed("ADMIN")
public class TeamView extends VerticalLayout {

    private final UserService userService;
    private final Grid<User> grid = new Grid<>(User.class, false);

    public TeamView(UserService userService) {
        this.userService = userService;

        H2 heading = new H2("Team Members");

        Button addBtn = new Button("Add Team Member", e -> openUserForm(new User()));
        addBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        configureGrid();
        add(heading, addBtn, grid);
        setSizeFull();
        loadUsers();
    }

    private void configureGrid() {
        grid.addColumn(User::getDisplayName).setHeader("Name").setSortable(true).setFlexGrow(1);
        grid.addColumn(User::getEmail).setHeader("Email").setFlexGrow(1);
        grid.addColumn(u -> u.getRole().name()).setHeader("Role").setSortable(true);
        grid.addComponentColumn(user -> {
            Span badge = new Span(user.isActive() ? "Active" : "Inactive");
            badge.getStyle().set("padding", "2px 8px").set("border-radius", "4px")
                    .set("font-size", "0.8em")
                    .set("background", user.isActive() ? "#e8f5e9" : "#f5f5f5")
                    .set("color", user.isActive() ? "#2e7d32" : "#616161");
            return badge;
        }).setHeader("Status");

        grid.addComponentColumn(user -> {
            String currentEmail = SecurityUtils.getCurrentUserEmail();

            Button editBtn = new Button("Edit", e -> openUserForm(user));
            editBtn.addThemeVariants(ButtonVariant.LUMO_SMALL, ButtonVariant.LUMO_TERTIARY);

            Button toggleBtn = new Button(user.isActive() ? "Deactivate" : "Activate");
            toggleBtn.addThemeVariants(ButtonVariant.LUMO_SMALL, ButtonVariant.LUMO_ERROR);
            toggleBtn.setEnabled(!user.getEmail().equals(currentEmail)); // Can't deactivate yourself
            toggleBtn.addClickListener(e -> {
                if (user.isActive()) {
                    userService.deactivateUser(user.getId());
                    Notification.show("User deactivated.", 2000, Notification.Position.TOP_CENTER);
                } else {
                    userService.reactivateUser(user.getId());
                    Notification.show("User reactivated.", 2000, Notification.Position.TOP_CENTER);
                }
                loadUsers();
            });

            return new HorizontalLayout(editBtn, toggleBtn);
        }).setHeader("Actions");

        grid.setSizeFull();
    }

    private void loadUsers() {
        grid.setItems(userService.findAll());
    }

    private void openUserForm(User user) {
        UserFormDialog dialog = new UserFormDialog(user, userService, this::loadUsers);
        dialog.open();
    }
}
