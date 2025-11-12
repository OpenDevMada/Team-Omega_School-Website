package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.omega.school.dto.StudentRequestDto;
import com.omega.school.mapper.StudentMapper;
import com.omega.school.model.Group;
import com.omega.school.model.Level;
import com.omega.school.model.Student;
import com.omega.school.repository.GroupRepository;
import com.omega.school.repository.LevelRepository;
import com.omega.school.repository.StudentRepository;
import com.omega.school.service.StudentService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final LevelRepository levelRepository;
    private final GroupRepository groupRepository;

    @Override
    public Student createStudent(StudentRequestDto dto) {
        if (studentRepository.existsByRegistrationNumber(dto.getRegistrationNumber())) {
            throw new IllegalArgumentException("Numéro d'enregistrement déjà utilisé");
        }

        Level level = levelRepository.findByName(dto.getLevel())
                .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé : " + dto.getLevel()));

        Group group = groupRepository.findByName(dto.getGroup())
                .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé : " + dto.getGroup()));

        Student student = StudentMapper.toEntity(dto, level, group);
        student.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> getStudentById(UUID userId) {
        return studentRepository.findById(userId);
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
    public Student updateStudent(UUID userId, StudentRequestDto updatedStudent) {
        Level level = levelRepository.findByName(updatedStudent.getLevel())
                .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé : " + updatedStudent.getLevel()));

        Group group = groupRepository.findByName(updatedStudent.getGroup())
                .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé : " + updatedStudent.getGroup()));

        return studentRepository.findById(
                userId)
                .map(existing -> {
                    existing.setFirstName(updatedStudent.getFirstName());
                    existing.setLastName(updatedStudent.getLastName());
                    existing.setRegistrationNumber(updatedStudent.getRegistrationNumber());
                    existing.setGroup(group);
                    existing.setLevel(level);
                    existing.setUpdatedAt(LocalDateTime.now());

                    if (updatedStudent.getPassword() != null && !updatedStudent.getPassword().isBlank()) {
                        existing.setPasswordHash(passwordEncoder.encode(updatedStudent.getPassword()));
                    }

                    return studentRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
    }

    @Override
    public void deleteStudent(UUID userId) {
        if (!studentRepository.existsById(userId)) {
            throw new EntityNotFoundException("Étudiant non trouvé");
        }
        studentRepository.deleteById(userId);
    }
}
