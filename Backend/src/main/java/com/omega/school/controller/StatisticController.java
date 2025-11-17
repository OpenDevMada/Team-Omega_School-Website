package com.omega.school.controller;

import com.omega.school.model.Statistic;
import com.omega.school.service.StatisticService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard/stat")
@RequiredArgsConstructor
public class StatisticController {

    private final StatisticService statisticService;

    @GetMapping("/current")
    public ResponseEntity<Statistic> getCurrentMonth() {
        return statisticService.getCurrentMonthStatistics()
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Aucune statistique pour le mois courant"));
    }

    @GetMapping
    public ResponseEntity<Page<Statistic>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Statistic> stats = statisticService.getAllStatistics(page, size);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/{periodLabel}")
    public ResponseEntity<Statistic> getByPeriod(@PathVariable String periodLabel) {
        return statisticService.getStatisticsByPeriodLabel(periodLabel)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Période non trouvée "));
    }
}
