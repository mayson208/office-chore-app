package com.officechores.ui;

import com.officechores.model.CompletionRecord;
import com.officechores.model.User;
import com.officechores.service.CompletionService;
import com.officechores.service.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Route(value = "history", layout = MainLayout.class)
@PageTitle("History | Office Chores")
@PermitAll
public class HistoryView extends VerticalLayout {

    private static final DateTimeFormatter DATETIME_FMT = DateTimeFormatter.ofPattern("MMM d, yyyy 'at' h:mm a");
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("MMM d, yyyy");

    private final CompletionService completionService;
    private final UserService userService;
    private final Grid<CompletionRecord> grid = new Grid<>(CompletionRecord.class, false);

    public HistoryView(CompletionService completionService, UserService userService) {
        this.completionService = completionService;
        this.userService = userService;

        H2 heading = new H2("Completion History");

        DatePicker fromPicker = new DatePicker("From");
        DatePicker toPicker = new DatePicker("To");

        List<User> allUsers = userService.findAll();
        ComboBox<User> userFilter = new ComboBox<>("Completed by");
        userFilter.setItems(allUsers);
        userFilter.setItemLabelGenerator(User::getDisplayName);
        userFilter.setClearButtonVisible(true);

        Button filterBtn = new Button("Filter", e -> applyFilter(fromPicker, toPicker, userFilter));
        filterBtn.addThemeVariants(ButtonVariant.LUMO_PRIMARY);

        Button clearBtn = new Button("Clear", e -> {
            fromPicker.clear();
            toPicker.clear();
            userFilter.clear();
            loadAll();
        });
        clearBtn.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        HorizontalLayout filters = new HorizontalLayout(fromPicker, toPicker, userFilter, filterBtn, clearBtn);
        filters.setDefaultVerticalComponentAlignment(com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment.END);

        configureGrid();
        add(heading, filters, grid);
        setSizeFull();
        loadAll();
    }

    private void configureGrid() {
        grid.addColumn(r -> r.getChoreInstance().getChore().getName())
                .setHeader("Chore").setSortable(true).setFlexGrow(1);
        grid.addColumn(r -> r.getChoreInstance().getScheduledDate().format(DATE_FMT))
                .setHeader("Was Due").setSortable(true);
        grid.addColumn(r -> r.getCompletedBy().getDisplayName())
                .setHeader("Completed By").setSortable(true);
        grid.addColumn(r -> r.getCompletedAt().format(DATETIME_FMT))
                .setHeader("Completed At").setSortable(true);
        grid.addComponentColumn(r -> {
            if (r.getComment() != null && !r.getComment().isBlank()) {
                Span comment = new Span(r.getComment());
                comment.setTitle(r.getComment()); // Tooltip for full text
                comment.getStyle().set("overflow", "hidden").set("text-overflow", "ellipsis")
                        .set("white-space", "nowrap").set("max-width", "200px").set("display", "block");
                return comment;
            }
            return new Span("");
        }).setHeader("Note").setFlexGrow(1);

        grid.setSizeFull();
    }

    private void loadAll() {
        List<CompletionRecord> records = completionService.findAll();
        grid.setItems(records);
    }

    private void applyFilter(DatePicker from, DatePicker to, ComboBox<User> userFilter) {
        List<CompletionRecord> records;

        if (from.getValue() != null && to.getValue() != null) {
            records = completionService.findByDateRange(
                    from.getValue().atStartOfDay(),
                    to.getValue().atTime(23, 59, 59));
        } else if (userFilter.getValue() != null) {
            records = completionService.findByUser(userFilter.getValue());
        } else {
            records = completionService.findAll();
        }

        if (userFilter.getValue() != null && (from.getValue() == null || to.getValue() == null)) {
            User filterUser = userFilter.getValue();
            records = records.stream()
                    .filter(r -> r.getCompletedBy().getId().equals(filterUser.getId()))
                    .toList();
        }

        grid.setItems(records);
    }
}
