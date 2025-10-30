package com.omega.school.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.stereotype.Service;
import com.omega.school.model.Course;
import com.omega.school.repository.CourseRepository;
import com.omega.school.service.CourseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;

    @Override
    public Course createCourse(Course course) {
        if (courseRepository.existsByTitle(course.getTitle())) {
            throw new IllegalArgumentException("Titre déjà utilisé");
        }
        return courseRepository.save(course);
    }

    @Override
    public Optional<Course> getCourseById(UUID id) {
        return courseRepository.findById(id);
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> getCoursesByTeacher(UUID teacherId) {
        return courseRepository.findByTeacherUserId(teacherId);
    }

    @Override
    public Course updateCourse(UUID id, Course newCourseData) {
        return courseRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(newCourseData.getTitle());
                    existing.setDescription(newCourseData.getDescription());
                    existing.setTeacher(newCourseData.getTeacher());
                    existing.setUpdatedAt(LocalDateTime.now());
                    return courseRepository.save(existing);
                })
                .orElseThrow(() -> new EntityNotFoundException("Cours non trouvé"));
    }

    @Override
    public void deleteCourse(UUID id) {
        courseRepository.deleteById(id);
    }
}
