package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.omega.school.dto.*;
import com.omega.school.mapper.GradeMapper;
import com.omega.school.model.*;
import com.omega.school.repository.*;
import com.omega.school.service.GradeService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GradeServiceImpl implements GradeService {

        private final GradeRepository gradeRepository;
        private final StudentRepository studentRepository;
        private final CourseRepository courseRepository;

        @Override
        public GradeResponseDto createGrade(GradeRequestDto dto) {
                Student student = studentRepository.findByRegistrationNumber(dto.getStudentRegistration())
                                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));

                Course course = courseRepository.findByTitle(dto.getCourseTitle())
                                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

                Grade grade = GradeMapper.toEntity(dto, student, course);
                grade.setCreatedAt(LocalDateTime.now());
                grade.setUpdatedAt(LocalDateTime.now());

                return GradeMapper.toDto(gradeRepository.save(grade));
        }

        @Override
        public List<GradeResponseDto> getGradesByStudentRegistration(String registration) {
                return gradeRepository.findByStudentRegistrationNumber(registration)
                                .stream().map(GradeMapper::toDto)
                                .collect(Collectors.toList());
        }

        @Override
        public List<GradeResponseDto> getGradesByCourseTitle(String title) {
                return gradeRepository.findByCourseTitle(title)
                                .stream().map(GradeMapper::toDto)
                                .collect(Collectors.toList());
        }

        @Override
        public GradeResponseDto updateGrade(GradeRequestDto dto) {
                Student student = studentRepository.findByRegistrationNumber(dto.getStudentRegistration())
                                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
                Course course = courseRepository.findByTitle(dto.getCourseTitle())
                                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

                GradeId id = new GradeId(student.getUserId(), course.getCourseId());

                Grade existing = gradeRepository.findById(id)
                                .orElseThrow(() -> new EntityNotFoundException("Note non trouvée"));

                existing.setValue(dto.getValue());
                existing.setComment(dto.getComment());
                existing.setUpdatedAt(LocalDateTime.now());

                return GradeMapper.toDto(gradeRepository.save(existing));
        }

        @Override
        public void deleteGrade(String studentRegistration, String courseTitle) {
                Student student = studentRepository.findByRegistrationNumber(studentRegistration)
                                .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé"));
                Course course = courseRepository.findByTitle(courseTitle)
                                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

                GradeId id = new GradeId(student.getUserId(), course.getCourseId());
                gradeRepository.deleteById(id);
        }
}
