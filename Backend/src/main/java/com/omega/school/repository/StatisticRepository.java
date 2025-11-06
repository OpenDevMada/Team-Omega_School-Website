package com.omega.school.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.omega.school.model.Statistic;

public interface StatisticRepository extends JpaRepository<Statistic, UUID> {
    Optional<Statistic> findByPeriodLabel(String periodLabel);
}
