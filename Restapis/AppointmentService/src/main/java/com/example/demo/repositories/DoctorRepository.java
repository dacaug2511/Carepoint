package com.example.demo.repositories;

import com.example.demo.entities.Doctor;
import com.example.demo.entities.DoctorStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    List<Doctor> findByStatus(DoctorStatus status);

    List<Doctor> findBySpecializationId(Integer specializationId);
    
    
}
