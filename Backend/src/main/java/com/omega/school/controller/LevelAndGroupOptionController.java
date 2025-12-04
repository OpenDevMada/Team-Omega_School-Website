package com.omega.school.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.omega.school.dto.RegistrationOptionsDto;
import com.omega.school.model.Group;
import com.omega.school.model.Level;
import com.omega.school.service.GroupService;
import com.omega.school.service.LevelService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/public")
@RequiredArgsConstructor
public class LevelAndGroupOptionController {
    private final LevelService levelService;
    private final GroupService groupService;

    @GetMapping("/options")
    public ResponseEntity<RegistrationOptionsDto> getRegistrationOptions() {

        List<Level> levels = levelService.getAllLevelsNoPagination();
        List<Group> groups = groupService.getAllGroupsNoPagination();

        RegistrationOptionsDto response = new RegistrationOptionsDto(levels, groups);

        return ResponseEntity.ok(response);
    }

}
