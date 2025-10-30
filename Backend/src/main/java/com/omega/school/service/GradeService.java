package com.omega.school.service;

import java.util.List;
import java.util.UUID;
import com.omega.school.model.Grade;
import com.omega.school.model.GradeId;

public interface GradeService {
    Grade createGrade(Grade grade);

    List<Grade> getGradesByStudent(UUID studentId);

    List<Grade> getGradesByCourse(UUID courseId);

    Grade updateGrade(GradeId id, Grade newData);

    void deleteGrade(GradeId id);
}
