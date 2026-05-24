package com.scholastic.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "assignments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne @JoinColumn(name = "teacher_id")
    private User teacher;

    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    private AssignmentStatus status = AssignmentStatus.NOT_STARTED;

    private int minutesRead = 0;

    private LocalDateTime createdAt = LocalDateTime.now();
}
