package com.omega.school.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StudentPartialUpdateDto extends UserPartialUpdateDto {

    private String level;
    private String group;
    private String emergencyContact;
}
