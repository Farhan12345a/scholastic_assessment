package com.scholastic.assignment.dto;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class AssignmentResponse {
    private Long id;
    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
    private String bookUrl;
    private String coverUrl;
    private Long studentId;
    private String studentName;
    private Long teacherId;
    private String teacherName;
    private LocalDate dueDate;
    private String status;
    private int minutesRead;
    private LocalDateTime createdAt;
}
