package com.example.demo.repositories;

import com.example.demo.entities.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SpecializationRepository extends JpaRepository<Specialization, Integer> {
    Optional<Specialization> findById(Integer id);
}
