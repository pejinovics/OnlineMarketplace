package com.onlineMarketplace.project.dto;

import jakarta.persistence.Column;

import java.time.LocalDate;

public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private String phoneNumber;
    private LocalDate registrationDate;
}
