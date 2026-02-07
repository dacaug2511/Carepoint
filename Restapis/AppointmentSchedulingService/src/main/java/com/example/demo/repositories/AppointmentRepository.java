package com.example.demo.repositories;


import com.example.demo.entities.Appointment;
import com.example.demo.entities.AppointmentStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

//    List<Appointment> findByDoctorIdAndAppointmentDate(int doctorId, LocalDate date);
//	List<Appointment>
//	findByDoctorIdAndAppointmentDateAndStatus(
//	        int doctorId,
//	        LocalDate date,
//	        AppointmentStatus status
//	);
	List<Appointment> findByDoctorIdAndAppointmentDateAndStatusIn(
		    int doctorId,
		    LocalDate date,
		    List<AppointmentStatus> statuses
		);



    boolean existsByDoctorIdAndAppointmentDateAndSlotTime(
            int doctorId,
            LocalDate date,
            LocalTime slotTime
    );
    
    List<Appointment> findByPatientIdOrderByAppointmentDateDesc(
            int patientId
    );
    
    List<Appointment> findByDoctorIdAndAppointmentDateOrderBySlotTime(
            int doctorId,
            LocalDate appointmentDate
    );
}

