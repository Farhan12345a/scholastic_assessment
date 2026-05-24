package com.scholastic.repository;
import com.scholastic.model.Assignment;
import com.scholastic.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByTeacher(User teacher);
    List<Assignment> findByStudent(User student);
}
