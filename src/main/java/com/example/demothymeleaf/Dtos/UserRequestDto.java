package com.example.demothymeleaf.Dtos;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserRequestDto {
    String name;
    String email;
    String Dob;
}
