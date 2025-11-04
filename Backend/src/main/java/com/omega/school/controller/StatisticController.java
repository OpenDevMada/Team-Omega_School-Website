package com.omega.school.controller;

import com.omega.school.model.Statistic;
import com.omega.school.service.StatisticService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@RestController
@RequestMapping("/dashboard/stat")
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;

    @GetMapping("/current")
    public ResponseEntity<Statistic> getCurrentMonth() {
        return statisticService.getCurrentMonthStatistics()
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Aucune statistique pour le mois courant"));
    }

    @GetMapping
    public ResponseEntity<List<Statistic>> getAll() {
        return ResponseEntity.ok(statisticService.getAllStatistics());
    }

    @GetMapping("/{periodLabel}")
    public ResponseEntity<Statistic> getByPeriod(@PathVariable String periodLabel) {
        return statisticService.getStatisticsByPeriodLabel(periodLabel)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Période non trouvée"));
    }
}
