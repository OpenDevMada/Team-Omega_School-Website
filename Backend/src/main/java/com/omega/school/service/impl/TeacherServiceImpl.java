package com.omega.school.service.impl;

import java.time.LocalDateTime;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.omega.school.dto.TeacherPartialUpdateDto;
import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.dto.TeacherUpdateDto;
import com.omega.school.mapper.TeacherMapper;
import com.omega.school.model.Teacher;
import com.omega.school.repository.TeacherRepository;
import com.omega.school.repository.UserRepository;
import com.omega.school.service.TeacherService;
import com.omega.school.utils.GenerateId;
import com.omega.school.utils.TemporaryPassword;

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
    private final GenerateId generateId;

    @Override
    public Teacher createTeacher(TeacherRequestDto dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        Teacher teacher = TeacherMapper.toEntity(dto);

        String matricule = generateId.generateMatricule();
        teacher.setMatriculeNumber(matricule);

        String temporaryPassword = TemporaryPassword.generateTemporaryPassword();

        teacher.setPasswordHash(passwordEncoder.encode(temporaryPassword));

        teacher.setMustChangePassword(true);
        teacher.setCreatedAt(LocalDateTime.now());
        teacher.setUpdatedAt(LocalDateTime.now());

        System.out.println("This is the temporary password: " + temporaryPassword);

        // TODO: envoyer l'email au user contenant le mot de passe temporaire
        // mailService.sendTemporaryPassword(dto.getEmail(), tempPassword);

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
    public Page<Teacher> getAllTeachers(int page, int size) {
        return teacherRepository.findAll(PageRequest.of(page, size));
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
    public Teacher partialUpdateTeacher(UUID userId, TeacherPartialUpdateDto dto) {

        Teacher teacher = teacherRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));

        if (dto.getEmail() != null &&
                !teacher.getEmail().equals(dto.getEmail()) &&
                userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        TeacherMapper.partialUpdate(dto, teacher);

        if (dto.getNewPassword() != null && !dto.getNewPassword().isBlank()) {
            teacher.setPasswordHash(passwordEncoder.encode(dto.getNewPassword()));
            teacher.setMustChangePassword(false);
        }

        teacher.setUpdatedAt(LocalDateTime.now());

        return teacherRepository.save(teacher);
    }

    @Override
    public void deleteTeacher(UUID userId) {
        if (!teacherRepository.existsById(userId)) {
            throw new EntityNotFoundException("Enseignant non trouvé");
        }
        teacherRepository.deleteById(userId);
    }
}