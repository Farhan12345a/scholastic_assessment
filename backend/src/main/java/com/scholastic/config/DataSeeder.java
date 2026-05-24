package com.scholastic.config;
import com.scholastic.model.Book;
import com.scholastic.model.Role;
import com.scholastic.model.User;
import com.scholastic.repository.BookRepository;
import com.scholastic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (bookRepository.count() == 0) {
            bookRepository.saveAll(List.of(
                new Book(null, "Pride and Prejudice", "Jane Austen",
                    "A romantic novel about the Bennet family and the proud Mr. Darcy.",
                    "https://covers.openlibrary.org/b/id/8739161-L.jpg",
                    "https://www.gutenberg.org/ebooks/1342"),
                new Book(null, "1984", "George Orwell",
                    "A dystopian novel about totalitarianism and surveillance.",
                    "https://covers.openlibrary.org/b/id/8575708-L.jpg",
                    "https://www.gutenberg.org/ebooks/61439"),
                new Book(null, "The Great Gatsby", "F. Scott Fitzgerald",
                    "A story of wealth, love, and the American Dream in the 1920s.",
                    "https://covers.openlibrary.org/b/id/8432734-L.jpg",
                    "https://www.gutenberg.org/ebooks/64317"),
                new Book(null, "Frankenstein", "Mary Shelley",
                    "The story of a scientist who creates a sentient creature.",
                    "https://covers.openlibrary.org/b/id/8406786-L.jpg",
                    "https://www.gutenberg.org/ebooks/84"),
                new Book(null, "The Adventures of Tom Sawyer", "Mark Twain",
                    "The adventures of a young boy growing up along the Mississippi River.",
                    "https://covers.openlibrary.org/b/id/8231856-L.jpg",
                    "https://www.gutenberg.org/ebooks/74"),
                new Book(null, "Dracula", "Bram Stoker",
                    "The classic Gothic horror novel about Count Dracula.",
                    "https://covers.openlibrary.org/b/id/8126178-L.jpg",
                    "https://www.gutenberg.org/ebooks/345"),
                new Book(null, "Alice's Adventures in Wonderland", "Lewis Carroll",
                    "Alice falls through a rabbit hole into a fantasy world.",
                    "https://covers.openlibrary.org/b/id/8739200-L.jpg",
                    "https://www.gutenberg.org/ebooks/11"),
                new Book(null, "The Odyssey", "Homer",
                    "The ancient Greek epic poem about Odysseus's journey home.",
                    "https://covers.openlibrary.org/b/id/8091016-L.jpg",
                    "https://www.gutenberg.org/ebooks/1727")
            ));
        }

        if (userRepository.count() == 0) {
            userRepository.saveAll(List.of(
                new User(null, "Demo Teacher", "teacher@demo.com", passwordEncoder.encode("password123"), Role.TEACHER),
                new User(null, "Alice Johnson", "student@demo.com", passwordEncoder.encode("password123"), Role.STUDENT),
                new User(null, "Bob Smith", "bob@demo.com", passwordEncoder.encode("password123"), Role.STUDENT),
                new User(null, "Carol White", "carol@demo.com", passwordEncoder.encode("password123"), Role.STUDENT)
            ));
        }
    }
}
