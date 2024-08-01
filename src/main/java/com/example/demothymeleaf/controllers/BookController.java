package com.example.demothymeleaf.controllers;

import ch.qos.logback.core.model.Model;
import com.example.demothymeleaf.Dtos.BookRequestDto;
import com.example.demothymeleaf.models.Book;
import com.example.demothymeleaf.models.Log;
import com.example.demothymeleaf.services.BookService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/book")
public class BookController {
    private static final Logger logger = LogManager.getLogger(Log.class);
    private final BookService bookService;

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String index(ModelMap model) {
        List<Book> books = bookService.findAll();
        model.addAttribute("books", books);
        return "book";
    }


    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String index(@RequestBody BookRequestDto book, ModelMap model) {
        logger.info("add book: {}", book);
        bookService.addBook(book);
        return "book";
    }
}
