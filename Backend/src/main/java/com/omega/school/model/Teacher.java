package com.omega.school.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "teacher")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "courses")
public class Teacher extends User {
    @Column(name = "matricule_number", unique = true)
    private String matriculeNumber;

    private String bio;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL)
    private List<Course> courses = new ArrayList<>();

    public Teacher(UUID userId, String firstName, String lastName,
            String email, String address, String phoneNumber, Role role, String password, String matriculeNumber,
            String bio) {
        super(userId, firstName, lastName, email, password, address, phoneNumber, role, null, null);
        this.matriculeNumber = matriculeNumber;
        this.bio = bio;
    }
}
