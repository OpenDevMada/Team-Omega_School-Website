package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.omega.school.dto.StudentPartialUpdateDto;
import com.omega.school.dto.StudentRequestDto;
import com.omega.school.dto.StudentUpdateDto;
import com.omega.school.mapper.StudentMapper;
import com.omega.school.model.Group;
import com.omega.school.model.Level;
import com.omega.school.model.Student;
import com.omega.school.repository.GroupRepository;
import com.omega.school.repository.LevelRepository;
import com.omega.school.repository.StudentRepository;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.StudentService;
import com.omega.school.utils.GenerateId;
import com.omega.school.utils.TemporaryPassword;

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
    private final GenerateId generateId;
    private final UserRepository userRepository;

    @Override
    public Student createStudent(StudentRequestDto dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        Level level = levelRepository.findByName(dto.getLevel())
                .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé : " + dto.getLevel()));

        Group group = groupRepository.findByName(dto.getGroup())
                .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé : " + dto.getGroup()));

        Student student = StudentMapper.toEntity(dto, level, group);

        student.setRegistrationNumber(generateId.generateRegistrationNumber());

        String temporaryPassword = TemporaryPassword.generateTemporaryPassword();

        student.setPasswordHash(passwordEncoder.encode(temporaryPassword));
        System.out.println("This is the temporary password: " + temporaryPassword);

        student.setMustChangePassword(true);
        student.setCreatedAt(LocalDateTime.now());
        student.setUpdatedAt(LocalDateTime.now());

        // TODO: envoyer l'email au user contenant le mot de passe temporaire
        // mailService.sendTemporaryPassword(dto.getEmail(), tempPassword);

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
    public Page<Student> getAllStudents(int page, int size) {
        return studentRepository.findAll(PageRequest.of(page, size));
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
    public Student updateStudent(UUID userId, StudentUpdateDto updatedStudent) {
        Level level = levelRepository.findByName(updatedStudent.getLevel())
                .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé : " + updatedStudent.getLevel()));

        Group group = groupRepository.findByName(updatedStudent.getGroup())
                .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé : " + updatedStudent.getGroup()));

        return studentRepository.findById(userId)
                .map(existing -> {
                    StudentMapper.updateEntityFromDto(updatedStudent, existing, level, group);
                    existing.setUpdatedAt(LocalDateTime.now());

                    return studentRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
    }

    @Override
    public Student partialUpdateStudent(UUID userId, StudentPartialUpdateDto dto) {

        Student student = studentRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));

        if (dto.getEmail() != null &&
                !dto.getEmail().equals(student.getEmail()) &&
                userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        Level level = null;
        if (dto.getLevel() != null) {
            level = levelRepository.findByName(dto.getLevel())
                    .orElseThrow(() -> new EntityNotFoundException("Niveau non trouvé : " + dto.getLevel()));
        }

        Group group = null;
        if (dto.getGroup() != null) {
            group = groupRepository.findByName(dto.getGroup())
                    .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé : " + dto.getGroup()));
        }

        StudentMapper.partialUpdate(dto, student, level, group);

        if (dto.getNewPassword() != null && !dto.getNewPassword().isBlank()) {
            student.setPasswordHash(passwordEncoder.encode(dto.getNewPassword()));
            student.setPasswordHash(passwordEncoder.encode(dto.getNewPassword()));
            student.setMustChangePassword(false);
            System.out.println("This is the new password: " + dto.getNewPassword());
        }

        student.setUpdatedAt(LocalDateTime.now());

        return studentRepository.save(student);
    }

    @Override
    public void deleteStudent(UUID userId) {
        if (!studentRepository.existsById(userId)) {
            throw new EntityNotFoundException("Étudiant non trouvé");
        }
        studentRepository.deleteById(userId);
    }
}
