package com.omega.school.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

import com.omega.school.dto.StudentRequestDto;
import com.omega.school.mapper.StudentMapper;
import com.omega.school.model.Student;
import com.omega.school.repository.StudentRepository;
import com.omega.school.service.StudentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public Student createStudent(StudentRequestDto dto) {
        if (studentRepository.existByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new IllegalArgumentException("Numéro d'enregistrement déjà utilisé");
        }

        Student student = StudentMapper.toEntity(dto);
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> getStudentById(UUID id) {
        return studentRepository.findById(id);
    }

    @Override
    public Optional<Student> getByRegistrationNumber(String regNumber) {
        return studentRepository.findByRegistrationNumber(regNumber);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public List<Student> getByLevel(String levelName) {
        return studentRepository.findByLevelName(levelName);
    }

    @Override
    public List<Student> getByGroup(String groupName) {
        return studentRepository.findByGroupName(groupName);
    }

    @Override
    public Student updateStudent(UUID id, StudentRequestDto updatedStudent) {
        return studentRepository.findById(id)
                .map(existing -> {
                    existing.setFirstName(updatedStudent.getFirstName());
                    existing.setLastName(updatedStudent.getLastName());
                    existing.setRegistrationNumber(updatedStudent.getRegistrationNumber());
                    existing.setGroup(updatedStudent.getGroup());
                    existing.setLevel(updatedStudent.getLevel());
                    return studentRepository.save(existing);
                })
                .orElseThrow(() -> new NoSuchElementException("Étudiant non trouvé"));
    }

    @Override
    public void deleteStudent(UUID id) {
        studentRepository.deleteById(id);
    }
}