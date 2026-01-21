package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.DoctorAvailability;

import com.example.demo.entities.DoctorAvailabilityId;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailability, DoctorAvailabilityId> {

}
