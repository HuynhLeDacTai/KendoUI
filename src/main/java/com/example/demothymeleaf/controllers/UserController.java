package com.example.demothymeleaf.controllers;


import com.example.demothymeleaf.Dtos.UserRequestDto;
import com.example.demothymeleaf.models.Log;
import com.example.demothymeleaf.models.User;
import com.example.demothymeleaf.services.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    public List<User> getUsers() {
        logger.info("User list", userService.getAllUsers());
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    @ResponseBody
    public void addUser(@RequestParam UserRequestDto user) {
        logger.debug("Add user", user);
        userService.addUser(user);
    }

    @DeleteMapping("/users")
    @ResponseBody
    public void deleteUser(@RequestParam("id") Long id) {
        userService.deleteUser(id);
    }
}
