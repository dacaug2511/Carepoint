package com.example.demo.repositories;


import com.example.demo.entities.DoctorAvailability;
import com.example.demo.entities.DoctorAvailabilityId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorAvailabilityRepository
        extends JpaRepository<DoctorAvailability, DoctorAvailabilityId> {

    List<DoctorAvailability> findByIdDoctorId(int doctorId);
}
