package com.example.demo.services.impl;

import com.example.demo.entities.*;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repositories.AppointmentRepository;
import com.example.demo.services.AppointmentService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    @Override
    public Appointment bookAppointment(Appointment appointment) {

        boolean exists = appointmentRepository
                .existsByDoctorIdAndAppointmentDateAndSlotTime(
                        appointment.getDoctorId(),
                        appointment.getAppointmentDate(),
                        appointment.getSlotTime()
                );

        if (exists) {
            throw new IllegalStateException("Appointment slot already booked");
        }

        appointment.setStatus(AppointmentStatus.SCHEDULED);
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment cancelAppointment(Integer appointmentId) {

        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.CANCELLED);
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAppointmentsByPatient(Integer patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(Integer doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public boolean isSlotAvailable(Integer doctorId, LocalDate date, LocalTime time) {
        return !appointmentRepository
                .existsByDoctorIdAndAppointmentDateAndSlotTime(doctorId, date, time);
    }
}
