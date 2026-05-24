package com.scholastic.assignment;
import com.scholastic.assignment.dto.*;
import com.scholastic.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {
    private final AssignmentService assignmentService;

    @PostMapping
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> create(@RequestBody CreateAssignmentRequest req, Authentication auth) {
        User teacher = (User) auth.getPrincipal();
        return ResponseEntity.ok(assignmentService.create(req, teacher));
    }

    @GetMapping("/teacher")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> getTeacherAssignments(Authentication auth) {
        User teacher = (User) auth.getPrincipal();
        return ResponseEntity.ok(assignmentService.getByTeacher(teacher));
    }

    @GetMapping("/student")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> getStudentAssignments(Authentication auth) {
        User student = (User) auth.getPrincipal();
        return ResponseEntity.ok(assignmentService.getByStudent(student));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UpdateAssignmentRequest req, Authentication auth) {
        User student = (User) auth.getPrincipal();
        return ResponseEntity.ok(assignmentService.update(id, req, student));
    }
}
