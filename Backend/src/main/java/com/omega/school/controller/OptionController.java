package com.omega.school.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.omega.school.dto.OptionsDto;
import com.omega.school.model.Course;
import com.omega.school.model.Group;
import com.omega.school.model.Level;
import com.omega.school.service.CourseService;
import com.omega.school.service.GroupService;
import com.omega.school.service.LevelService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class OptionController {
    private final LevelService levelService;
    private final GroupService groupService;
    private final CourseService courseService;

    @GetMapping("/options")
    public ResponseEntity<OptionsDto> getOptions() {

        List<Level> levels = levelService.getAllLevelsNoPagination();
        List<Group> groups = groupService.getAllGroupsNoPagination();
        List<Course> courses = courseService.getAllCoursesNoPagination();

        OptionsDto response = new OptionsDto(levels, groups, courses);

        return ResponseEntity.ok(response);
    }

}
