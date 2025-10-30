package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.omega.school.model.Grade;
import com.omega.school.model.GradeId;
import com.omega.school.repository.GradeRepository;
import com.omega.school.service.GradeService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GradeServiceImpl implements GradeService {

    private final GradeRepository gradeRepository;

    @Override
    public Grade createGrade(Grade grade) {
        return gradeRepository.save(grade);
    }

    @Override
    public List<Grade> getGradesByStudent(UUID studentId) {
        return gradeRepository.findByStudentUserId(studentId);
    }

    @Override
    public List<Grade> getGradesByCourse(UUID courseId) {
        return gradeRepository.findByCourseCourseId(courseId);
    }

    @Override
    public Grade updateGrade(GradeId id, Grade newData) {
        return gradeRepository.findById(id)
                .map(existing -> {
                    existing.setValue(newData.getValue());
                    existing.setComment(newData.getComment());
                    existing.setUpdatedAt(LocalDateTime.now());
                    return gradeRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Note non trouvée"));
    }

    @Override
    public void deleteGrade(GradeId id) {
        gradeRepository.deleteById(id);
    }
}
