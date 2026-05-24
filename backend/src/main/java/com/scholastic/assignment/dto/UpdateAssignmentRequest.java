package com.scholastic.assignment.dto;
import lombok.Data;

@Data
public class UpdateAssignmentRequest {
    private String status;
    private Integer minutesRead;
}
