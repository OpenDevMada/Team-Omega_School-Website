package com.omega.school.utils;

import java.time.LocalDate;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import com.omega.school.repository.AdminRepository;
import com.omega.school.repository.StudentRepository;
import com.omega.school.repository.TeacherRepository;

@Service
@RequiredArgsConstructor
public class GenerateId {

    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;

    public String generateRegistrationNumber() {
        int year = LocalDate.now().getYear();
        String prefix = "S-" + year + "-";

        List<String> lastRegs = studentRepository.findLastRegistrationNumberOfYear(prefix, PageRequest.of(0, 1));

        int newNumber = 1;
        if (!lastRegs.isEmpty()) {
            String last = lastRegs.get(0);
            String[] parts = last.split("-");
            newNumber = Integer.parseInt(parts[2]) + 1;
        }

        return prefix + String.format("%03d", newNumber);
    }

    public String generateMatricule() {
        int year = LocalDate.now().getYear();
        String prefix = "T-" + year + "-";

        List<String> lastMatricules = teacherRepository.findLastMatriculeOfYear(prefix, PageRequest.of(0, 1));

        int newNumber = 1;

        if (!lastMatricules.isEmpty()) {
            String last = lastMatricules.get(0);
            String[] parts = last.split("-");
            newNumber = Integer.parseInt(parts[2]) + 1;
        }

        return prefix + String.format("%03d", newNumber);
    }

    public String generateAdminId() {
        int year = LocalDate.now().getYear();
        String prefix = "A-" + year + "-";

        List<String> lastIds = adminRepository.findLastAdminIdOfYear(prefix, PageRequest.of(0, 1));

        int newNumber = 1;
        if (!lastIds.isEmpty()) {
            String last = lastIds.get(0);
            String[] parts = last.split("-");
            newNumber = Integer.parseInt(parts[2]) + 1;
        }

        return prefix + String.format("%03d", newNumber);
    }

}
