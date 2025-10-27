package com.omega.school.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "student")
@PrimaryKeyJoinColumn(name = "user_id")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class Student extends User {

    @Column(name = "registration_number", unique = true)
    private String registrationNumber;

    @ManyToOne
    @JoinColumn(name = "level_id")
    private Level level;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    public Student(UUID userId, String registrationNumber, Level level, Group group, String firstName, String lastName,
            String email, String passwordHash, String address, String phoneNumber, Role role) {
        super(userId, firstName, lastName, email, passwordHash, address, phoneNumber, role, null, null);
        this.group = group;
        this.level = level;
        this.registrationNumber = registrationNumber;
    }
}
