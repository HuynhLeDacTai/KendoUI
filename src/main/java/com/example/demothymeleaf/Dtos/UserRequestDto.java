package com.example.demothymeleaf.Dtos;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRequestDto {
    String name;
    String email;
    LocalDateTime dob;
}
