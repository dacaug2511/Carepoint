package com.example.demo.repositories;

import com.example.demo.entities.DoctorAvailability;
import com.example.demo.entities.DoctorAvailabilityId;
import com.example.demo.entities.DayOfWeekEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorAvailabilityRepository
        extends JpaRepository<DoctorAvailability, DoctorAvailabilityId> {

    Optional<DoctorAvailability> findByIdDoctorIdAndIdDay(
            Integer doctorId,
            DayOfWeekEnum day
    );
}
