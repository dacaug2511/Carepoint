package com.example.demo.controllers;

import com.example.demo.entities.User;
import com.example.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
//@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    // Get user by ID
    @GetMapping("/{uid}")
    public User getUserById(@PathVariable Integer uid) {
        return userService.getUserById(uid);
    }
    
    
    // Get all users (Admin)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Update profile
    @PutMapping("/{uid}")
    public User updateUser(@PathVariable Integer uid,
                           @RequestBody User user) {
        return userService.updateProfile(uid, user);
    }

    // Delete user
    @DeleteMapping("/{uid}")
    public String deleteUser(@PathVariable Integer uid) {
        userService.deleteUser(uid);
        return "User deleted successfully";
    }
}