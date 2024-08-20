package com.onlineMarketplace.project.service;

import com.onlineMarketplace.project.dto.UserDTO;
import com.onlineMarketplace.project.model.User;
import com.onlineMarketplace.project.repository.IUserRepository;
import com.onlineMarketplace.project.service.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public Collection<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User registerUser(UserDTO userDTO) {
        String passwordEncoded = bCryptPasswordEncoder.encode(userDTO.getPassword());
        User user = new User();
        user.setPassword(passwordEncoded);
        user.setId(userDTO.getId());
        user.setUsername(userDTO.getUsername());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setRegistrationDate(userDTO.getRegistrationDate());
        userRepository.save(user);
        return user;
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
