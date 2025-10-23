package com.omega.school.model;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@EqualsAndHashCode
@Setter
@Embeddable
public class GradeId implements Serializable {
    private String studentId;
    private String courseId;
}
