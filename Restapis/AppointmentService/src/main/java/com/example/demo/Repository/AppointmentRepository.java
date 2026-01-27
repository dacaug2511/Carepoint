package com.example.demo.repositories;

import com.example.demo.entities.Appointment;
import com.example.demo.entities.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    // Conflict check (no double booking)
    Optional<Appointment> findByDoctorIdAndAppointmentDateAndSlotTime(
            Integer doctorId,
            LocalDate appointmentDate,
            LocalTime slotTime
    );

    // Patient appointment history
    List<Appointment> findByPatientIdOrderByAppointmentDateDesc(Integer patientId);

    // Doctor appointments by date
    List<Appointment> findByDoctorIdAndAppointmentDate(
            Integer doctorId,
            LocalDate appointmentDate
    );

    // Doctor dashboard
    List<Appointment> findByDoctorId(Integer doctorId);

    // Admin view
    List<Appointment> findByStatus(AppointmentStatus status);

    // Count daily appointments (analytics / monitoring)
    @Query("""
        SELECT COUNT(a) 
        FROM Appointment a 
        WHERE a.appointmentDate = :date
    """)
    long countAppointmentsByDate(LocalDate date);
}
