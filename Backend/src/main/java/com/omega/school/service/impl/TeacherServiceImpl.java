package com.omega.school.service.impl;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;

import com.omega.school.dto.TeacherRequestDto;
import com.omega.school.mapper.TeacherMapper;
import com.omega.school.model.Teacher;
import com.omega.school.repository.TeacherRepository;
import com.omega.school.service.TeacherService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;

    @Override
    public Teacher createTeacher(TeacherRequestDto dto) {
        if (teacherRepository.existsByMatriculeNumber(dto.getMatriculeNumber())) {
            throw new IllegalArgumentException("Matricule déjà utilisé");
        }

        Teacher teacher = TeacherMapper.toEntity(dto);
        return teacherRepository.save(teacher);
    }

    @Override
    public Optional<Teacher> getTeacherById(UUID id) {
        return teacherRepository.findById(id);
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
    public Teacher updateTeacher(UUID id, TeacherRequestDto updatedTeacher) {
        return teacherRepository.findById(id)
                .map(existing -> {
                    existing.setFirstName(updatedTeacher.getFirstName());
                    existing.setLastName(updatedTeacher.getLastName());
                    existing.setBio(updatedTeacher.getBio());
                    existing.setMatriculeNumber(updatedTeacher.getMatriculeNumber());
                    return teacherRepository.save(existing);
                })
                .orElseThrow(() -> new NoSuchElementException("Enseignant non trouvé"));
    }

    @Override
    public void deleteTeacher(UUID id) {
        teacherRepository.deleteById(id);
    }
}