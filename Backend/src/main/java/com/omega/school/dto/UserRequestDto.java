package com.omega.school.dto;

import java.time.LocalDate;

import com.omega.school.model.Sex;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
    private String avatarUrl;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @Past
    private LocalDate birthDate;

    @NotNull
    private Sex sex;

    @NotBlank
    private String address;

    @NotBlank
    private String phoneNumber;

}
