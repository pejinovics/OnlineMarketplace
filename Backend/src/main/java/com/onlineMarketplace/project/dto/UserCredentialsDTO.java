package com.onlineMarketplace.project.dto;

import com.onlineMarketplace.project.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentialsDTO {

    private Long id;

    @NotEmpty
    private String username;

    @NotEmpty
    private String password;


    public UserCredentialsDTO(User user){
        this.id = user.getId();
        this.username = user.getUsername();
        this.password = user.getPassword();
    }
}
