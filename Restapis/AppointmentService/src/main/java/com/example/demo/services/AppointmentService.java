package com.example.demo.services;

import com.example.demo.entities.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentService {

    Appointment bookAppointment(Appointment appointment);

    Appointment cancelAppointment(Integer appointmentId);

    List<Appointment> getAppointmentsByPatient(Integer patientId);

    List<Appointment> getAppointmentsByDoctor(Integer doctorId);

    boolean isSlotAvailable(Integer doctorId, LocalDate date, LocalTime time);
}
