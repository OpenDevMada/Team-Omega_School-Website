package com.omega.school.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "teacher")
@PrimaryKeyJoinColumn(name = "user_id")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = "courses")
public class Teacher extends User {
    @Column(name = "matricule_number", unique = true, nullable = false)
    private String matriculeNumber;

    private String bio;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Course> courses = new ArrayList<>();

    public Teacher(UUID userId, String firstName, String lastName,
            String email, LocalDate birthDate, Sex sex, String address, String phoneNumber, Role role,
            String passwordHash, String matriculeNumber,
            String bio, String avatarUrl, boolean mustChangePassword) {
        super(userId, avatarUrl, firstName, lastName, email, birthDate, sex, passwordHash, address, phoneNumber, role,
                mustChangePassword,
                null, null);
        this.matriculeNumber = matriculeNumber;
        this.bio = bio;
    }
}
