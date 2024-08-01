package com.example.demothymeleaf.services;

import com.example.demothymeleaf.Dtos.BookRequestDto;
import com.example.demothymeleaf.models.Book;

import java.util.List;

public interface BookService {
    List<Book> findAll();

    void addBook(BookRequestDto book);
}
