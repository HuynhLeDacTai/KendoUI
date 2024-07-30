package com.example.demothymeleaf.controllers;


import com.example.demothymeleaf.Dtos.UserRequestDto;
import com.example.demothymeleaf.models.Log;
import com.example.demothymeleaf.models.User;
import com.example.demothymeleaf.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@CrossOrigin
public class UserController {
    private static final Logger logger = LogManager.getLogger(Log.class);
    private final UserService userService;

    @GetMapping("/")
    public String homePage(Model model) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        return "index";
    }

    @GetMapping("/users")
    @ResponseBody
    public String getUsers(ModelMap model) {
        logger.info("User list : {}", userService.getAllUsers());
        model.addAttribute("users", userService.getAllUsers());
        return "index";
    }

    @PostMapping("/users")
    @ResponseBody
    public void addUser(@RequestParam("user") UserRequestDto user, HttpServletRequest request) {
        logger.info("Servlet rq: {}", request);
        logger.info("Add user: {}", user);
        userService.addUser(user);
    }

    @DeleteMapping("/users")
    @ResponseBody
    public void deleteUser(@RequestParam("id") Long id) {
        logger.info("Delete user: {}", id);
        userService.deleteUser(id);
    }
}
