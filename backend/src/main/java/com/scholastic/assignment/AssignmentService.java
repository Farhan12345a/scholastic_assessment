package com.scholastic.assignment;
import com.scholastic.assignment.dto.*;
import com.scholastic.model.Assignment;
import com.scholastic.model.AssignmentStatus;
import com.scholastic.model.User;
import com.scholastic.repository.AssignmentRepository;
import com.scholastic.repository.BookRepository;
import com.scholastic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public List<AssignmentResponse> create(CreateAssignmentRequest req, User teacher) {
        var book = bookRepository.findById(req.getBookId()).orElseThrow();
        return req.getStudentIds().stream().map(studentId -> {
            var student = userRepository.findById(studentId).orElseThrow();
            var a = new Assignment();
            a.setBook(book);
            a.setStudent(student);
            a.setTeacher(teacher);
            a.setDueDate(req.getDueDate());
            a.setStatus(AssignmentStatus.NOT_STARTED);
            a.setMinutesRead(0);
            a.setCreatedAt(LocalDateTime.now());
            return toResponse(assignmentRepository.save(a));
        }).collect(Collectors.toList());
    }

    public List<AssignmentResponse> getByTeacher(User teacher) {
        return assignmentRepository.findByTeacher(teacher).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<AssignmentResponse> getByStudent(User student) {
        return assignmentRepository.findByStudent(student).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public AssignmentResponse update(Long id, UpdateAssignmentRequest req, User student) {
        var a = assignmentRepository.findById(id).orElseThrow();
        if (req.getStatus() != null) a.setStatus(AssignmentStatus.valueOf(req.getStatus()));
        if (req.getMinutesRead() != null) a.setMinutesRead(req.getMinutesRead());
        return toResponse(assignmentRepository.save(a));
    }

    private AssignmentResponse toResponse(Assignment a) {
        var r = new AssignmentResponse();
        r.setId(a.getId());
        r.setBookId(a.getBook().getId());
        r.setBookTitle(a.getBook().getTitle());
        r.setBookAuthor(a.getBook().getAuthor());
        r.setBookUrl(a.getBook().getBookUrl());
        r.setCoverUrl(a.getBook().getCoverUrl());
        r.setStudentId(a.getStudent().getId());
        r.setStudentName(a.getStudent().getName());
        r.setTeacherId(a.getTeacher().getId());
        r.setTeacherName(a.getTeacher().getName());
        r.setDueDate(a.getDueDate());
        r.setStatus(a.getStatus().name());
        r.setMinutesRead(a.getMinutesRead());
        r.setCreatedAt(a.getCreatedAt());
        return r;
    }
}
