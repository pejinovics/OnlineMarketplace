package com.onlineMarketplace.project.controller;

import com.onlineMarketplace.project.dto.UserDTO;
import com.onlineMarketplace.project.exception.ResourceConflictException;
import com.onlineMarketplace.project.model.Advertisement;
import com.onlineMarketplace.project.model.User;
import com.onlineMarketplace.project.service.interfaces.IUserService;
import com.onlineMarketplace.project.validation.IdentityConstraint;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@Validated
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping()
    public ResponseEntity<User> register(@Valid @RequestBody UserDTO userDTO) throws Exception {
        User savedUser = userService.registerUser(userDTO);
        if(savedUser == null){
            throw new ResourceConflictException(userDTO.getId(),"Username already exists");
        }
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUsers(){
        Collection<User> users = userService.findAll();
        return new ResponseEntity<Collection<User>>(users, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@IdentityConstraint @PathVariable("id") Long id){
        Optional<User> user = userService.findById(id);
        if(user.isEmpty()){
            return new ResponseEntity<Optional<User>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Optional<User>>(user, HttpStatus.OK);
    }
    
    @DeleteMapping (value = "/delete/{id}")
    public ResponseEntity<?> deleteUser(@IdentityConstraint @PathVariable("id") Long id) {
        userService.deleteById(id);
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}
