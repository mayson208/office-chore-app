package com.officechores.scheduler;

import com.officechores.model.ChoreInstance;
import com.officechores.model.User;
import com.officechores.service.AssignmentService;
import com.officechores.service.ChoreInstanceService;
import com.officechores.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class OverdueAndReminderJob {

    private static final Logger log = LoggerFactory.getLogger(OverdueAndReminderJob.class);

    private final ChoreInstanceService choreInstanceService;
    private final AssignmentService assignmentService;
    private final NotificationService notificationService;

    public OverdueAndReminderJob(ChoreInstanceService choreInstanceService,
                                  AssignmentService assignmentService,
                                  NotificationService notificationService) {
        this.choreInstanceService = choreInstanceService;
        this.assignmentService = assignmentService;
        this.notificationService = notificationService;
    }

    @Scheduled(cron = "0 0 * * * *")
    public void runChecks() {
        markOverdueInstances();
        sendReminders();
        sendOverdueAlerts();
    }

    private void markOverdueInstances() {
        List<ChoreInstance> overdue = choreInstanceService.findOverdueInstances();
        for (ChoreInstance instance : overdue) {
            try {
                choreInstanceService.markOverdue(instance);
            } catch (Exception e) {
                log.error("Failed to mark instance {} as overdue: {}", instance.getId(), e.getMessage());
            }
        }
        if (!overdue.isEmpty()) {
            log.info("Marked {} instances as overdue.", overdue.size());
        }
    }

    private void sendReminders() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        List<ChoreInstance> upcoming = choreInstanceService.findPendingInstancesForReminder(tomorrow);
        for (ChoreInstance instance : upcoming) {
            List<User> assignees = assignmentService.getAssigneesForInstance(instance);
            for (User user : assignees) {
                try {
                    notificationService.sendReminderEmail(user, instance);
                } catch (Exception e) {
                    log.error("Failed to send reminder for instance {} to {}: {}", instance.getId(), user.getEmail(), e.getMessage());
                }
            }
            choreInstanceService.markReminderSent(instance);
        }
    }

    private void sendOverdueAlerts() {
        List<ChoreInstance> overdueInstances = choreInstanceService.findOverdueInstances();
        for (ChoreInstance instance : overdueInstances) {
            List<User> assignees = assignmentService.getAssigneesForInstance(instance);
            for (User user : assignees) {
                try {
                    notificationService.sendOverdueAlertEmail(user, instance);
                } catch (Exception e) {
                    log.error("Failed to send overdue alert for instance {}: {}", instance.getId(), e.getMessage());
                }
            }
        }
    }
}
