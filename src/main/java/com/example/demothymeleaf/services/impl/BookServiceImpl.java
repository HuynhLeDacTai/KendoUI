package com.example.demothymeleaf.services.impl;

import com.example.demothymeleaf.Dtos.BookRequestDto;
import com.example.demothymeleaf.models.Book;
import com.example.demothymeleaf.repositories.BookRepository;
import com.example.demothymeleaf.services.BookService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.example.demothymeleaf.models.Log;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {
    private static final Logger logger = LogManager.getLogger(Log.class);
    private final BookRepository bookRepository;

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public void addBook(BookRequestDto book) {
        logger.debug("add book service: {}", book);
        Book newBook = Book.builder().title(book.getTitle()).published(book.getPublished()).author(book.getAuthor()).category(book.getCategory()).status(book.getStatus()).build();
        bookRepository.save(newBook);
    }
}
