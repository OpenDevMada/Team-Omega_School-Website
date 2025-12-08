package com.omega.school.service;

import com.omega.school.model.Student;
import com.omega.school.model.Teacher;

import java.util.List;

public interface TeacherStudentService {
    List<Student> getStudentsOfTeacher(String teacherId);

    List<Teacher> getTeachersOfStudent(String registration);
}
