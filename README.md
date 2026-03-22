# Office Chore App

A full-stack **Java/Spring Boot** web application for managing and tracking office chores. Built with a Vaadin UI, role-based security, automated scheduling, and a real-time calendar view.

---

## Features

- **Chore Management** — Create, assign, and track recurring or one-off chores
- **Team Management** — Multi-user support with role-based access (Admin / User)
- **Calendar View** — Visual calendar of upcoming and overdue chores
- **Recurrence Engine** — Auto-generates chore instances on a configurable schedule
- **Notifications** — In-app notifications for overdue chores and upcoming reminders
- **Completion Tracking** — Full history log of completed chores with timestamps
- **Authentication** — Secure login with Spring Security
- **Docker Support** — Containerized for easy deployment

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Java 21 |
| Backend | Spring Boot 3 |
| UI | Vaadin Flow (server-side Java) |
| Security | Spring Security |
| Database | H2 (dev) / configurable |
| Scheduling | Spring `@Scheduled` jobs |
| Build | Maven |
| Deploy | Docker |

---

## Getting Started

### Prerequisites
- Java 21+
- Maven 3.8+

### Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/mayson208/office-chore-app.git
   cd office-chore-app
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run**
   ```bash
   mvn spring-boot:run
   # or on Windows:
   start.bat
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Run with Docker

```bash
docker build -t office-chore-app .
docker run -p 8080:8080 office-chore-app
```

---

## Project Structure

```
src/main/java/com/officechores/
├── ChoreApplication.java         # Spring Boot entry point
├── config/
│   └── SecurityConfig.java       # Spring Security config
├── model/                        # JPA entities
│   ├── Chore.java
│   ├── ChoreInstance.java
│   ├── Assignment.java
│   ├── User.java / UserRole.java
│   ├── Notification.java
│   └── CompletionRecord.java
├── repository/                   # Spring Data JPA repositories
├── service/                      # Business logic layer
│   ├── ChoreService.java
│   ├── AssignmentService.java
│   ├── RecurrenceService.java
│   ├── NotificationService.java
│   └── CompletionService.java
├── scheduler/                    # Scheduled background jobs
│   ├── RecurrenceGeneratorJob.java
│   └── OverdueAndReminderJob.java
├── security/
│   └── CustomUserDetailsService.java
└── ui/                           # Vaadin views
    ├── MainLayout.java
    ├── LoginView.java
    ├── CalendarView.java
    ├── ManageChoresView.java
    ├── TeamView.java
    ├── HistoryView.java
    └── ProfileView.java
```

---

## Architecture

- **Domain model** drives the app — chores, instances, assignments, completion records
- **Recurrence engine** automatically generates future chore instances on schedule
- **Scheduler jobs** run in the background to flag overdue chores and fire reminders
- **Spring Security** handles authentication and role-based access control
- **Vaadin** renders server-side UI — no REST API needed, state lives on the server

---

## Author

Built by [mayson208](https://github.com/mayson208)
