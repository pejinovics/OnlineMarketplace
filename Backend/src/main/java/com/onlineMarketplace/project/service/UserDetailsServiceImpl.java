package com.onlineMarketplace.project.service;

import com.onlineMarketplace.project.model.User;
import com.onlineMarketplace.project.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private IUserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            User u = user.get();
            return org.springframework.security.core.userdetails.User
                    .withUsername(username)
                    .password(u.getPassword())
                    .authorities(new ArrayList<>()) // Bez uloga, samo prazna lista
                    .build();
        }
        throw new UsernameNotFoundException("User not found with this username: " + username);
    }
}
