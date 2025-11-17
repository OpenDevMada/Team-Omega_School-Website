package com.omega.school.dto;

import java.time.LocalDate;

import com.omega.school.model.Sex;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String address;
    private String Level;
    private String group;
    private Sex sex;
    private String emergencyContact;
    private String phoneNumber;
    private LocalDate birthDate;
}
