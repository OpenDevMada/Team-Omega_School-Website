package com.omega.school.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
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
    public Page<Statistic> getAllStatistics(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return statisticRepository.findAll(pageable);
    }

    @Override
    public Optional<Statistic> getStatisticsByPeriodLabel(String periodLabel) {
        if (periodLabel == null || periodLabel.isBlank()) {
            throw new IllegalArgumentException("Le label de période ne peut pas être vide");
        }
        return statisticRepository.findByPeriodLabel(periodLabel);
    }

}
