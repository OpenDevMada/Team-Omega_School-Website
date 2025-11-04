package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<CourseResponseDto> getAllCourses() {
        return courseRepository.findAll()
                .stream().map(CourseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CourseResponseDto> getCoursesByTeacherMatricule(String matricule) {
        Teacher teacher = teacherRepository.findByMatriculeNumber(matricule)
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));
        return courseRepository.findByTeacherUserId(teacher.getUserId())
                .stream().map(CourseMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CourseResponseDto updateCourse(String title, CourseRequestDto dto) {
        Course course = courseRepository.findByTitle(title)
                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));

        Teacher teacher = teacherRepository.findByMatriculeNumber(dto.getTeacherMatricule())
                .orElseThrow(() -> new EntityNotFoundException("Enseignant non trouvé"));

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
