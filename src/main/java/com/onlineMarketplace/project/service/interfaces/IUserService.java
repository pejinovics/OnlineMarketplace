package com.onlineMarketplace.project.service.interfaces;

import com.onlineMarketplace.project.dto.UserDTO;
import com.onlineMarketplace.project.model.User;

import java.util.Collection;
import java.util.Optional;

public interface IUserService {
    Collection<User> findAll();
    Optional<User> findById(Long id);
    User registerUser(UserDTO userDTO);
    User save(User user);
    void deleteById(Long id);
}
