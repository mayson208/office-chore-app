package com.officechores.scheduler;

import com.officechores.model.Chore;
import com.officechores.service.ChoreService;
import com.officechores.service.ChoreInstanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RecurrenceGeneratorJob {

    private static final Logger log = LoggerFactory.getLogger(RecurrenceGeneratorJob.class);

    private final ChoreService choreService;
    private final ChoreInstanceService choreInstanceService;

    public RecurrenceGeneratorJob(ChoreService choreService, ChoreInstanceService choreInstanceService) {
        this.choreService = choreService;
        this.choreInstanceService = choreInstanceService;
    }

    @Scheduled(cron = "0 0 1 * * *")
    public void generateUpcomingInstances() {
        log.info("Running recurrence generation job...");
        List<Chore> recurringChores = choreService.findAllActiveRecurring();
        for (Chore chore : recurringChores) {
            try {
                choreInstanceService.generateUpcomingInstances(chore, 4);
            } catch (Exception e) {
                log.error("Failed to generate instances for chore {}: {}", chore.getId(), e.getMessage());
            }
        }
        log.info("Recurrence generation complete for {} chores.", recurringChores.size());
    }
}
