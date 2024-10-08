package com.onlineMarketplace.project.model;

import com.onlineMarketplace.project.dto.UserCredentialsDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate registrationDate;

    @Transient
    private String jwt;

    public User(UserCredentialsDTO userCredentialsDTO){
//        this.id = userCredentialsDTO.getId();
        this.username = userCredentialsDTO.getUsername();
        this.password = userCredentialsDTO.getPassword();
    }
}
