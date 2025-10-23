package com.omega.school.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Teacher extends User {
    private String matriculeNumber;
    private String bio;
    private List<Course> courses = new ArrayList<>();

    public Teacher(UUID userId, String firstName, String lastName,
            String email, String address, String phoneNumber, Role role, String matriculeNumber, String bio) {
        super(userId, firstName, lastName, email, address, phoneNumber, role, null, null);
        this.matriculeNumber = matriculeNumber;
        this.bio = bio;
    }
}
