package com.omega.school.service;

import java.util.Optional;

import org.springframework.data.domain.Page;

import com.omega.school.model.Statistic;

public interface StatisticService {
    Optional<Statistic> getCurrentMonthStatistics();

    Page<Statistic> getAllStatistics(int page, int size);

    Optional<Statistic> getStatisticsByPeriodLabel(String periodLabel);
}
