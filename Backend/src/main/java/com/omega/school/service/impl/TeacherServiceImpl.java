package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.dto.TeacherUpdateDto;
import com.omega.school.mapper.TeacherMapper;
import com.omega.school.model.Teacher;
import com.omega.school.repository.TeacherRepository;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.TeacherService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Teacher createTeacher(TeacherRequestDto dto) {
        if (teacherRepository.existsByMatriculeNumber(dto.getMatriculeNumber())) {
            throw new IllegalArgumentException("Matricule déjà utilisé");
        }
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        Teacher teacher = TeacherMapper.toEntity(dto);
        teacher.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        teacher.setCreatedAt(LocalDateTime.now());
        teacher.setUpdatedAt(LocalDateTime.now());

        return teacherRepository.save(teacher);
    }

    @Override
    public Optional<Teacher> getTeacherById(UUID userId) {
        return teacherRepository.findById(userId);
    }

    @Override
    public Optional<Teacher> getByMatriculeNumber(String matriculeNumber) {
        return teacherRepository.findByMatriculeNumber(matriculeNumber);
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher updateTeacher(UUID userId, TeacherUpdateDto updatedTeacher) {
        return teacherRepository.findById(
                userId)
                .map(existing -> {

                    if (!existing.getEmail().equals(updatedTeacher.getEmail()) &&
                            userRepository.existsByEmail(updatedTeacher.getEmail())) {
                        throw new IllegalArgumentException("Email déjà utilisé");
                    }

                    TeacherMapper.updateEntityFromDto(updatedTeacher, existing);
                    existing.setUpdatedAt(LocalDateTime.now());

                    return teacherRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));
    }

    @Override
    public void deleteTeacher(UUID userId) {
        if (!teacherRepository.existsById(userId)) {
            throw new EntityNotFoundException("Enseignant non trouvé");
        }
        teacherRepository.deleteById(userId);
    }
}