package com.omega.school.controller;

import com.omega.school.dto.UserPartialUpdateDto;
import com.omega.school.dto.UserRequestDto;
import com.omega.school.dto.UserUpdateDto;
import com.omega.school.model.Admin;

import com.omega.school.service.AdminService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/admins")
@PreAuthorize("hasAuthority('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<Admin> create(@Valid @RequestBody UserRequestDto admin) {
        Admin created = adminService.createAdmin(admin);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Admin> getById(@PathVariable UUID userId) {
        Admin admin = adminService.getAdminById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Admin non trouvé"));
        return ResponseEntity.ok(admin);
    }

    @GetMapping("/adminId/{adminId}")
    public ResponseEntity<Admin> getByAdminId(@PathVariable String adminId) {
        Admin admin = adminService.getByAdminId(adminId)
                .orElseThrow(() -> new EntityNotFoundException("Admin non trouvé"));
        return ResponseEntity.ok(admin);
    }

    @GetMapping
    public ResponseEntity<Page<Admin>> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Admin> admins = adminService.getAllAdmins(page, size);
        return ResponseEntity.ok(admins);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<Admin> update(@PathVariable UUID userId, @Valid @RequestBody UserUpdateDto admin) {
        Admin updated = adminService.updateAdmin(userId, admin);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<Admin> partialUpdateAdmin(
            @PathVariable UUID userId,
            @RequestBody UserPartialUpdateDto dto) {

        Admin updated = adminService.partialUpdateAdmin(userId, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> delete(@PathVariable UUID userId) {
        adminService.deleteAdmin(userId);
        return ResponseEntity.noContent().build();
    }

}
