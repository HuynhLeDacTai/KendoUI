package com.example.demothymeleaf.services;

import com.example.demothymeleaf.Dtos.UserRequestDto;
import com.example.demothymeleaf.models.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();

    void addUser(UserRequestDto user);

    void deleteUser(Long id);
}
