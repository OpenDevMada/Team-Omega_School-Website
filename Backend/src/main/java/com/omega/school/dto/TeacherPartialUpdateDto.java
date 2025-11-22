package com.omega.school.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class TeacherPartialUpdateDto extends UserPartialUpdateDto {

    private String bio;
}