package com.omega.school.controller;

import com.omega.school.dto.GroupRequestDto;
import com.omega.school.model.Group;
import com.omega.school.service.GroupService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN')")
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Group> create(@RequestBody GroupRequestDto dto) {
        Group created = groupService.createGroup(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Group> getByName(@PathVariable String name) {
        return groupService.getGroupByName(name)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé"));
    }

    @GetMapping
    public ResponseEntity<Page<Group>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Group> groups = groupService.getAllGroups(page, size);
        return ResponseEntity.ok(groups);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> update(@PathVariable UUID id, @RequestBody GroupRequestDto dto) {
        Group updated = groupService.updateGroup(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        groupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }
}
