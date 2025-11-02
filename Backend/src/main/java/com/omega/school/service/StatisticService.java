package com.omega.school.service;

import java.util.List;
import java.util.Optional;
import com.omega.school.model.Statistic;

public interface StatisticService {
    Optional<Statistic> getCurrentMonthStatistics();

    List<Statistic> getAllStatistics();

    Optional<Statistic> getStatisticsByPeriodLabel(String periodLabel);
}
