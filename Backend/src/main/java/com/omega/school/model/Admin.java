package com.omega.school.model;

import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Admin extends User {
    private String adminId;
    private Permission permission;

    public Admin(UUID userId, String adminId, Permission permission, String firstName, String lastName,
            String email, String address, String phoneNumber, Role role) {
        super(userId, firstName, lastName, email, address, phoneNumber, role, null, null);
        this.adminId = adminId;
        this.permission = permission;
    }
}
