package com.officechores.ui;

import com.officechores.model.ChoreInstance;
import com.officechores.model.ChoreStatus;
import com.officechores.model.User;
import com.officechores.service.AssignmentService;
import com.officechores.service.ChoreInstanceService;
import com.officechores.service.CompletionService;
import com.officechores.service.UserService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import jakarta.annotation.security.PermitAll;
import org.vaadin.stefan.fullcalendar.Entry;
import org.vaadin.stefan.fullcalendar.FullCalendar;
import org.vaadin.stefan.fullcalendar.FullCalendarBuilder;
import org.vaadin.stefan.fullcalendar.dataprovider.InMemoryEntryProvider;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Route(value = "", layout = MainLayout.class)
@PageTitle("Calendar | Office Chores")
@PermitAll
public class CalendarView extends VerticalLayout {

    private final ChoreInstanceService choreInstanceService;
    private final AssignmentService assignmentService;
    private final CompletionService completionService;
    private final UserService userService;

    private FullCalendar calendar;
    private InMemoryEntryProvider<Entry> entryProvider;
    private User currentUser;

    public CalendarView(ChoreInstanceService choreInstanceService,
                        AssignmentService assignmentService,
                        CompletionService completionService,
                        UserService userService) {
        this.choreInstanceService = choreInstanceService;
        this.assignmentService = assignmentService;
        this.completionService = completionService;
        this.userService = userService;

        currentUser = SecurityUtils.getCurrentUser(userService).orElse(null);

        setSizeFull();
        setPadding(false);
        setSpacing(false);

        buildCalendar();
        buildToolbar();
        add(buildToolbarLayout(), calendar);
        expand(calendar);

        loadCalendarEntries();
    }

    private void buildCalendar() {
        calendar = FullCalendarBuilder.create().build();
        calendar.setSizeFull();
        calendar.setFirstDay(java.time.DayOfWeek.MONDAY);

        entryProvider = InMemoryEntryProvider.from();
        calendar.setEntryProvider(entryProvider);

        // Click on an entry to open details
        calendar.addEntryClickedListener(event -> {
            String entryId = event.getEntry().getId();
            try {
                Long instanceId = Long.parseLong(entryId);
                choreInstanceService.findById(instanceId).ifPresent(instance -> {
                    ChoreDetailDialog dialog = new ChoreDetailDialog(
                            instance, currentUser, choreInstanceService,
                            assignmentService, completionService, userService,
                            this::loadCalendarEntries
                    );
                    dialog.open();
                });
            } catch (NumberFormatException ignored) {}
        });

        // Drag-and-drop to reschedule
        calendar.addEntryDroppedListener(event -> {
            Entry updatedEntry = event.applyChangesOnEntry();
            LocalDate newDate = updatedEntry.getStart().toLocalDate();
            try {
                Long instanceId = Long.parseLong(updatedEntry.getId());
                choreInstanceService.reschedule(instanceId, newDate);
                loadCalendarEntries();
            } catch (Exception e) {
                loadCalendarEntries(); // Revert on error
            }
        });
    }

    private HorizontalLayout buildToolbarLayout() {
        Button today = new Button("Today", e -> {
            calendar.today();
            loadCalendarEntries();
        });
        Button prev = new Button("‹", e -> {
            calendar.previous();
            loadCalendarEntries();
        });
        Button next = new Button("›", e -> {
            calendar.next();
            loadCalendarEntries();
        });

        ComboBox<String> viewSelect = new ComboBox<>();
        viewSelect.setItems("Week", "Month", "Day", "List");
        viewSelect.setValue("Week");
        viewSelect.setWidth("120px");
        viewSelect.addValueChangeListener(e -> {
            if (e.getValue() == null) return;
            switch (e.getValue()) {
                case "Month" -> calendar.changeView(org.vaadin.stefan.fullcalendar.CalendarViewImpl.DAY_GRID_MONTH);
                case "Day" -> calendar.changeView(org.vaadin.stefan.fullcalendar.CalendarViewImpl.TIME_GRID_DAY);
                case "List" -> calendar.changeView(org.vaadin.stefan.fullcalendar.CalendarViewImpl.LIST_WEEK);
                default -> calendar.changeView(org.vaadin.stefan.fullcalendar.CalendarViewImpl.TIME_GRID_WEEK);
            }
            loadCalendarEntries();
        });

        Button refresh = new Button("Refresh", e -> loadCalendarEntries());
        refresh.addThemeVariants(ButtonVariant.LUMO_TERTIARY);

        HorizontalLayout toolbar = new HorizontalLayout(prev, today, next, viewSelect, refresh);
        toolbar.setDefaultVerticalComponentAlignment(com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment.CENTER);
        toolbar.setPadding(true);
        return toolbar;
    }

    private void buildToolbar() {
        // Set initial view to week
        calendar.changeView(org.vaadin.stefan.fullcalendar.CalendarViewImpl.TIME_GRID_WEEK);
    }

    private void loadCalendarEntries() {
        // Load a wide range (+/- 3 months) so calendar navigation works without reloading
        LocalDate start = LocalDate.now().minusMonths(3);
        LocalDate end = LocalDate.now().plusMonths(3);
        List<ChoreInstance> instances = choreInstanceService.getInstancesForRange(start, end);

        List<Entry> entries = instances.stream().map(this::toEntry).toList();
        entryProvider.removeAllEntries();
        entryProvider.addEntries(entries);
        calendar.getEntryProvider().refreshAll();
    }

    private Entry toEntry(ChoreInstance instance) {
        Entry entry = new Entry(String.valueOf(instance.getId()));

        List<User> assignees = assignmentService.getAssigneesForInstance(instance);
        String assigneeNames = assignees.isEmpty() ? "Unassigned"
                : assignees.stream().map(User::getDisplayName).reduce((a, b) -> a + ", " + b).orElse("");

        entry.setTitle(instance.getChore().getName() + "\n" + assigneeNames);

        LocalTime time = instance.getScheduledTime() != null ? instance.getScheduledTime() : LocalTime.of(9, 0);
        entry.setStart(LocalDateTime.of(instance.getScheduledDate(), time));
        entry.setEnd(LocalDateTime.of(instance.getScheduledDate(), time.plusHours(1)));

        entry.setDurationEditable(false);
        entry.setEditable(instance.getStatus() != ChoreStatus.COMPLETED);

        switch (instance.getStatus()) {
            case OVERDUE -> entry.setColor("#f44336");
            case COMPLETED -> {
                entry.setColor("#9e9e9e");
                entry.setEditable(false);
            }
            default -> entry.setColor("#4caf50");
        }

        return entry;
    }
}
