package com.example.demo.repositories;

import com.example.demo.entities.Doctor;
import com.example.demo.entities.User;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    List<Doctor> findByStatus(Doctor.Status status);
    List<Doctor> findBySpecialization_SpecializationId(Long specializationId);
    boolean existsByDoctorIdAndStatus(Integer doctorId, Doctor.Status status);
    Optional<Doctor> findByUser(User user);

}