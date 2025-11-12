package com.omega.school.controller;

import com.omega.school.model.Group;
import com.omega.school.service.GroupService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping
    public ResponseEntity<Group> create(@RequestBody String groupName) {
        Group created = groupService.createGroup(groupName);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Group> getByName(@PathVariable String name) {
        return groupService.getGroupByName(name)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new EntityNotFoundException("Groupe non trouvé"));
    }

    @GetMapping
    public ResponseEntity<List<Group>> getAll() {
        List<Group> groups = groupService.getAllGroups();
        return ResponseEntity.ok(groups);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> update(@PathVariable UUID id, @RequestBody String groupName) {
        Group updated = groupService.updateGroup(id, groupName);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        groupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }
}
