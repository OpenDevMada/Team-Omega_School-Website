package com.omega.school.dto;

import java.time.LocalDate;

import com.omega.school.model.Sex;

import lombok.Data;

@Data
public class UserPartialUpdateDto {

    private String avatarUrl;

    private String firstName;

    private String lastName;

    private LocalDate birthDate;

    private Sex sex;

    private String address;

    private String phoneNumber;

}