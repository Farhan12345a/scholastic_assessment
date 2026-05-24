package com.scholastic.assignment.dto;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CreateAssignmentRequest {
    private Long bookId;
    private List<Long> studentIds;
    private LocalDate dueDate;
}
