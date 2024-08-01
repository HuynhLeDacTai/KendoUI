package com.example.demothymeleaf.services.impl;

import com.example.demothymeleaf.Dtos.UserRequestDto;
import com.example.demothymeleaf.models.User;
import com.example.demothymeleaf.repositories.UserRepository;
import com.example.demothymeleaf.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void addUser(UserRequestDto user) {
        User newUser = User.builder().name(user.getName()).email(user.getEmail()).Dob(user.getDob()).build();
        userRepository.save(newUser);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
