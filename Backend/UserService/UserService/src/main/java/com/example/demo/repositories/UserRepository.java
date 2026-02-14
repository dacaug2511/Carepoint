package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

//import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	 // Login / Authentication
    Optional<User> findByUname(String uname);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    // Registration validation
    boolean existsByUname(String uname);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByAadhaar(String aadhaar);

	Optional<User> findByUnameAndPassword(String uname, String password);
}
