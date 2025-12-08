package com.omega.school.service.impl;

import com.omega.school.model.Student;
import com.omega.school.model.Teacher;
import com.omega.school.repository.StudentRepository;
import com.omega.school.service.TeacherStudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeacherStudentServiceImpl implements TeacherStudentService {

    private final StudentRepository studentRepository;

    @Override
    public List<Student> getStudentsOfTeacher(String teacherId) {
        return studentRepository.findStudentsByTeacher(UUID.fromString(teacherId));
    }

    @Override
    public List<Teacher> getTeachersOfStudent(String registration) {
        return studentRepository.findTeachersByStudent(registration);
    }
}
