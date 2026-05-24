package com.scholastic.user;
import com.scholastic.model.Role;
import com.scholastic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/students")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> getStudents() {
        return ResponseEntity.ok(userRepository.findByRole(Role.STUDENT));
    }
}
