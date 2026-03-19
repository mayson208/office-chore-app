package com.officechores.ui;

import com.officechores.model.Chore;
import com.officechores.model.User;
import com.officechores.service.ChoreService;
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
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.RolesAllowed;

import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@Route(value = "manage-chores", layout = MainLayout.class)
@PageTitle("Manage Chores | Office Chores")
@RolesAllowed("ADMIN")
public class ManageChoresView extends VerticalLayout {

    private final ChoreService choreService;
    private final UserService userService;
    private final Grid<Chore> grid = new Grid<>(Chore.class, false);
    private List<Chore> allChores;

    public ManageChoresView(ChoreService choreService, UserService userService) {
        this.choreService = choreService;
        this.userService = userService;

        H2 heading = new H2("Manage Chores");

        TextField search = new TextField("Search");
        search.setPlaceholder("Filter by name...");
        search.setClearButtonVisible(true);
        search.setValueChangeMode(ValueChangeMode.LAZY);
        search.addValueChangeListener(e -> filterGrid(e.getValue()));

        Button addBtn = new Button("Add New Chore", e -> openChoreForm(new Chore()));
        addBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        HorizontalLayout toolbar = new HorizontalLayout(search, addBtn);
        toolbar.setDefaultVerticalComponentAlignment(com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment.END);

        configureGrid();
        add(heading, toolbar, grid);
        setSizeFull();
        loadChores();
    }

    private void configureGrid() {
        grid.addColumn(Chore::getName).setHeader("Name").setSortable(true).setFlexGrow(1);
        grid.addColumn(this::formatRecurrence).setHeader("Recurrence").setFlexGrow(1);
        grid.addComponentColumn(chore -> {
            Span badge = new Span(chore.isActive() ? "Active" : "Inactive");
            badge.getStyle().set("padding", "2px 8px").set("border-radius", "4px")
                    .set("font-size", "0.8em")
                    .set("background", chore.isActive() ? "#e8f5e9" : "#f5f5f5")
                    .set("color", chore.isActive() ? "#2e7d32" : "#616161");
            return badge;
        }).setHeader("Status");

        grid.addComponentColumn(chore -> {
            Button editBtn = new Button("Edit", e -> openChoreForm(chore));
            editBtn.addThemeVariants(ButtonVariant.LUMO_SMALL, ButtonVariant.LUMO_TERTIARY);

            Button toggleBtn = new Button(chore.isActive() ? "Deactivate" : "Activate", e -> {
                if (chore.isActive()) {
                    choreService.deactivateChore(chore.getId());
                    Notification.show("Chore deactivated.", 2000, Notification.Position.TOP_CENTER);
                } else {
                    choreService.reactivateChore(chore.getId());
                    Notification.show("Chore reactivated.", 2000, Notification.Position.TOP_CENTER);
                }
                loadChores();
            });
            toggleBtn.addThemeVariants(ButtonVariant.LUMO_SMALL, ButtonVariant.LUMO_ERROR);

            return new HorizontalLayout(editBtn, toggleBtn);
        }).setHeader("Actions");

        grid.setSizeFull();
    }

    private String formatRecurrence(Chore chore) {
        return switch (chore.getRecurrenceType()) {
            case NONE -> "One-time";
            case DAILY -> "Daily at " + formatTime(chore);
            case WEEKLY -> {
                String day = chore.getRecurrenceDayOfWeek() != null
                        ? java.time.DayOfWeek.of(chore.getRecurrenceDayOfWeek()).getDisplayName(TextStyle.FULL, Locale.getDefault())
                        : "Monday";
                yield "Every " + day + " at " + formatTime(chore);
            }
            case MONTHLY -> {
                String day = chore.getRecurrenceDayOfMonth() != null ? chore.getRecurrenceDayOfMonth().toString() : "1";
                yield "Monthly on day " + day + " at " + formatTime(chore);
            }
        };
    }

    private String formatTime(Chore chore) {
        if (chore.getRecurrenceTime() == null) return "9:00 AM";
        return chore.getRecurrenceTime().format(java.time.format.DateTimeFormatter.ofPattern("h:mm a"));
    }

    private void loadChores() {
        allChores = choreService.findAll();
        grid.setItems(allChores);
    }

    private void filterGrid(String filter) {
        if (filter == null || filter.isBlank()) {
            grid.setItems(allChores);
        } else {
            String lower = filter.toLowerCase();
            grid.setItems(allChores.stream()
                    .filter(c -> c.getName().toLowerCase().contains(lower))
                    .toList());
        }
    }

    private void openChoreForm(Chore chore) {
        User currentUser = SecurityUtils.getCurrentUser(userService).orElse(null);
        ChoreFormDialog dialog = new ChoreFormDialog(chore, currentUser, choreService, this::loadChores);
        dialog.open();
    }
}
