package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;

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
        public Map<String, Object> getGradesByStudentRegistration(String registration, int page, int size) {
                Pageable pageable = PageRequest.of(page, size);

                Page<Grade> gradePage = gradeRepository.findByStudentRegistrationNumber(registration, pageable);

                List<GradeResponseDto> content = gradePage.getContent()
                                .stream()
                                .map(GradeMapper::toDto)
                                .collect(Collectors.toList());

                Map<String, Object> response = new HashMap<>();
                response.put("content", content);
                response.put("currentPage", gradePage.getNumber());
                response.put("totalItems", gradePage.getTotalElements());
                response.put("totalPages", gradePage.getTotalPages());

                return response;
        }

        @Override
        public Map<String, Object> getGradesByCourseTitle(String title, int page, int size) {
                Pageable pageable = PageRequest.of(page, size);

                Page<Grade> gradePage = gradeRepository.findByCourseTitle(title, pageable);

                List<GradeResponseDto> content = gradePage.getContent()
                                .stream()
                                .map(GradeMapper::toDto)
                                .collect(Collectors.toList());

                Map<String, Object> response = new HashMap<>();
                response.put("content", content);
                response.put("currentPage", gradePage.getNumber());
                response.put("totalItems", gradePage.getTotalElements());
                response.put("totalPages", gradePage.getTotalPages());

                return response;
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
                if (!gradeRepository.existsById(id)) {
                        throw new EntityNotFoundException("Note non trouvée");
                }
                gradeRepository.deleteById(id);
        }
}
