package com.example.demo.repositories;

import com.example.demo.entities.Appointment;
import com.example.demo.entities.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    // Check if a doctor already has an appointment at given date & time
    boolean existsByDoctorIdAndAppointmentDateAndSlotTime(
            Integer doctorId,
            LocalDate appointmentDate,
            LocalTime slotTime
    );

    // Fetch appointments for a patient
    List<Appointment> findByPatientId(Integer patientId);

    // Fetch appointments for a doctor
    List<Appointment> findByDoctorId(Integer doctorId);

    // Fetch appointments by status
    List<Appointment> findByStatus(AppointmentStatus status);

    // Fetch appointment by doctor + date + time (useful for validation)
    Optional<Appointment> findByDoctorIdAndAppointmentDateAndSlotTime(
            Integer doctorId,
            LocalDate appointmentDate,
            LocalTime slotTime
    );
}
