package com.example.demothymeleaf.controllers;


import com.example.demothymeleaf.Dtos.UserRequestDto;
import com.example.demothymeleaf.models.User;
import com.example.demothymeleaf.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class UserController {

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
        return userService.getAllUsers();
    }

    @PostMapping("/users")
    @ResponseBody
    public void addUser(@RequestBody UserRequestDto user) {
        System.out.printf(String.valueOf(user));
        userService.addUser(user);
    }

    @DeleteMapping("/users")
    @ResponseBody
    public void deleteUser(@RequestParam("id") Long id) {
        userService.deleteUser(id);
    }
}
