package com.omega.school.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "admin")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Admin extends User {
    @Column(name = "admin_id", unique = true)
    private String adminId;

    private String permission = "FULL";

    public Admin(UUID userId, String adminId, String firstName, String lastName,
            String email, String passwordHash, String address, String phoneNumber, Role role) {
        super(userId, firstName, lastName, email, passwordHash, address, phoneNumber, role, null, null);
        this.adminId = adminId;
    }
}
