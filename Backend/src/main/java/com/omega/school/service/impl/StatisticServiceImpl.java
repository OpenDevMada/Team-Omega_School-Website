package com.omega.school.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.omega.school.model.Statistic;
import com.omega.school.repository.StatisticRepository;
import com.omega.school.service.StatisticService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {
    private final StatisticRepository statisticRepository;

    @Override
    public Optional<Statistic> getCurrentMonthStatistics() {
        String monthLabel = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM"));
        return statisticRepository.findByPeriodLabel(monthLabel);
    }

    @Override
    public List<Statistic> getAllStatistics() {
        return statisticRepository.findAll();
    }

    @Override
    public Optional<Statistic> getStatisticsByPeriodLabel(String periodLabel) {
        if (periodLabel == null || periodLabel.isBlank()) {
            throw new IllegalArgumentException("Le label de période ne peut pas être vide");
        }
        return statisticRepository.findByPeriodLabel(periodLabel);
    }

}
