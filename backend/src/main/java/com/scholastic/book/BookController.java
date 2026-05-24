package com.scholastic.book;
import com.scholastic.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    private final BookRepository bookRepository;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(bookRepository.findAll());
    }
}
