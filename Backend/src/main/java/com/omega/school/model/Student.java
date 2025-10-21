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
public class Student extends User {
    private String registrationNumber;
    private Level level;
    private Group group;

    public Student(UUID userId, String registrationNumber, Level level, Group group, String firstName, String lastName,
            String email, String address, String phoneNumber, Role role) {
        super(userId, firstName, lastName, email, address, phoneNumber, role, null, null);
        this.group = group;
        this.level = level;
        this.registrationNumber = registrationNumber;
    }
}
