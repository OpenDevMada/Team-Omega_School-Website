package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.omega.school.dto.*;
import com.omega.school.mapper.CourseMapper;
import com.omega.school.model.*;
import com.omega.school.repository.*;
import com.omega.school.service.CourseService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;

    @Override
    public CourseResponseDto createCourse(CourseRequestDto dto) {
        if (courseRepository.existsByTitle(dto.getTitle())) {
            throw new IllegalArgumentException("Titre déjà utilisé");
        }
        if (dto.getTitle() == null || dto.getTitle().isBlank()) {
            throw new IllegalArgumentException("Le titre du cours ne peut pas être vide");
        }

        Teacher teacher = teacherRepository.findByMatriculeNumber(dto.getTeacherMatricule())
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));

        Course course = CourseMapper.toEntity(dto, teacher);
        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());

        return CourseMapper.toDto(courseRepository.save(course));
    }

    @Override
    public CourseResponseDto getCourseByTitle(String title) {
        Course course = courseRepository.findByTitle(title)
                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));
        return CourseMapper.toDto(course);
    }

    @Override
    public Map<String, Object> getAllCourses(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Course> coursePage = courseRepository.findAll(pageable);

        List<CourseResponseDto> content = coursePage.getContent()
                .stream()
                .map(CourseMapper::toDto)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("content", content);
        response.put("currentPage", coursePage.getNumber());
        response.put("totalItems", coursePage.getTotalElements());
        response.put("totalPages", coursePage.getTotalPages());

        return response;
    }

    @Override
    public Map<String, Object> getCoursesByTeacherMatricule(String matricule, int page, int size) {
        Teacher teacher = teacherRepository.findByMatriculeNumber(matricule)
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));

        Pageable pageable = PageRequest.of(page, size);

        Page<Course> coursePage = courseRepository.findByTeacherUserId(
                teacher.getUserId(), pageable);

        List<CourseResponseDto> content = coursePage.getContent()
                .stream()
                .map(CourseMapper::toDto)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("content", content);
        response.put("currentPage", coursePage.getNumber());
        response.put("totalItems", coursePage.getTotalElements());
        response.put("totalPages", coursePage.getTotalPages());

        return response;
    }

    @Override
    public CourseResponseDto updateCourse(String title, CourseRequestDto dto) {
        Course course = courseRepository.findByTitle(title)
                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

        Teacher teacher = teacherRepository.findByMatriculeNumber(dto.getTeacherMatricule())
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));

        if (!course.getTitle().equals(dto.getTitle()) && courseRepository.existsByTitle(dto.getTitle())) {
            throw new IllegalArgumentException("Titre déjà utilisé");
        }

        course.setDescription(dto.getDescription());
        course.setTeacher(teacher);
        course.setUpdatedAt(LocalDateTime.now());
        return CourseMapper.toDto(courseRepository.save(course));
    }

    @Override
    public void deleteCourse(String title) {
        Course course = courseRepository.findByTitle(title)
                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));
        courseRepository.delete(course);
    }
}
