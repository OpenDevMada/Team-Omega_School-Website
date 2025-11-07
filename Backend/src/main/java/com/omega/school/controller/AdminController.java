package com.omega.school.controller;

import com.omega.school.dto.AdminRequestDto;
import com.omega.school.model.Admin;
import com.omega.school.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping("/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<Admin> create(@RequestBody AdminRequestDto admin) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createAdmin(admin));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Admin> getById(@PathVariable UUID userId) {
        return adminService.getAdminById(userId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin non trouvé"));
    }

    @GetMapping("/adminId/{adminId}")
    public ResponseEntity<Admin> getByAdminId(@PathVariable String adminId) {
        return adminService.getByAdminId(adminId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin non trouvé"));
    }

    @GetMapping
    public ResponseEntity<List<Admin>> getAll() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Admin> update(@PathVariable UUID userId, @RequestBody AdminRequestDto admin) {
        try {
            return ResponseEntity.ok(adminService.updateAdmin(userId, admin));
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable UUID userId) {
        adminService.deleteAdmin(userId);
        return ResponseEntity.noContent().build();
    }
}
