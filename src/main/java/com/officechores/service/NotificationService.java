package com.officechores.service;

import com.officechores.model.*;
import com.officechores.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);
    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("EEEE, MMMM d, yyyy");
    private static final DateTimeFormatter TIME_FMT = DateTimeFormatter.ofPattern("h:mm a");

    private final JavaMailSender mailSender;
    private final NotificationRepository notificationRepository;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.base-url}")
    private String baseUrl;

    public NotificationService(JavaMailSender mailSender, NotificationRepository notificationRepository) {
        this.mailSender = mailSender;
        this.notificationRepository = notificationRepository;
    }

    public void sendReminderEmail(User user, ChoreInstance instance) {
        if (!user.isEmailNotificationsEnabled()) return;
        if (notificationRepository.existsByRecipientAndChoreInstanceAndType(user, instance, NotificationType.REMINDER)) return;

        String subject = "Reminder: " + instance.getChore().getName() + " is due tomorrow";
        String body = buildReminderBody(user, instance);
        boolean success = sendEmail(user.getEmail(), subject, body);
        notificationRepository.save(new Notification(user, instance, NotificationType.REMINDER, success));
    }

    public void sendOverdueAlertEmail(User user, ChoreInstance instance) {
        if (!user.isEmailNotificationsEnabled()) return;
        if (notificationRepository.existsByRecipientAndChoreInstanceAndType(user, instance, NotificationType.OVERDUE_ALERT)) return;

        String subject = "Overdue: " + instance.getChore().getName() + " was due " + instance.getScheduledDate().format(DATE_FMT);
        String body = buildOverdueBody(user, instance);
        boolean success = sendEmail(user.getEmail(), subject, body);
        notificationRepository.save(new Notification(user, instance, NotificationType.OVERDUE_ALERT, success));
    }

    public void sendAssignmentEmail(User user, ChoreInstance instance) {
        if (!user.isEmailNotificationsEnabled()) return;

        String subject = "You've been assigned: " + instance.getChore().getName() + " on " + instance.getScheduledDate().format(DATE_FMT);
        String body = buildAssignmentBody(user, instance);
        boolean success = sendEmail(user.getEmail(), subject, body);
        notificationRepository.save(new Notification(user, instance, NotificationType.ASSIGNMENT, success));
    }

    public void sendWelcomeEmail(User user) {
        String subject = "Welcome to Office Chores!";
        String body = "Hi " + user.getDisplayName() + ",\n\n"
                + "Your account has been created. You can log in at:\n"
                + baseUrl + "\n\n"
                + "Email: " + user.getEmail() + "\n\n"
                + "Please change your password after your first login.\n\n"
                + "The Office Chore App";
        boolean success = sendEmail(user.getEmail(), subject, body);
        notificationRepository.save(new Notification(user, null, NotificationType.WELCOME, success));
    }

    private boolean sendEmail(String to, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(body);
            mailSender.send(message);
            log.info("Email sent to {}: {}", to, subject);
            return true;
        } catch (MailException e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage());
            return false;
        }
    }

    private String buildReminderBody(User user, ChoreInstance instance) {
        Chore chore = instance.getChore();
        StringBuilder sb = new StringBuilder();
        sb.append("Hi ").append(user.getDisplayName()).append(",\n\n");
        sb.append("This is a reminder that \"").append(chore.getName()).append("\" is due tomorrow, ");
        sb.append(instance.getScheduledDate().format(DATE_FMT));
        if (instance.getScheduledTime() != null) {
            sb.append(" at ").append(instance.getScheduledTime().format(TIME_FMT));
        }
        sb.append(".\n");
        if (chore.getNotes() != null && !chore.getNotes().isBlank()) {
            sb.append("\nNotes: ").append(chore.getNotes()).append("\n");
        }
        sb.append("\nView it at: ").append(baseUrl).append("\n\nThe Office Chore App");
        return sb.toString();
    }

    private String buildOverdueBody(User user, ChoreInstance instance) {
        Chore chore = instance.getChore();
        return "Hi " + user.getDisplayName() + ",\n\n"
                + "\"" + chore.getName() + "\" was due on "
                + instance.getScheduledDate().format(DATE_FMT) + " and is now overdue.\n\n"
                + "Please complete it as soon as possible.\n\n"
                + "View it at: " + baseUrl + "\n\nThe Office Chore App";
    }

    private String buildAssignmentBody(User user, ChoreInstance instance) {
        Chore chore = instance.getChore();
        StringBuilder sb = new StringBuilder();
        sb.append("Hi ").append(user.getDisplayName()).append(",\n\n");
        sb.append("You have been assigned: ").append(chore.getName()).append("\n");
        sb.append("Due: ").append(instance.getScheduledDate().format(DATE_FMT));
        if (instance.getScheduledTime() != null) {
            sb.append(" at ").append(instance.getScheduledTime().format(TIME_FMT));
        }
        sb.append("\n\nView it at: ").append(baseUrl).append("\n\nThe Office Chore App");
        return sb.toString();
    }
}
