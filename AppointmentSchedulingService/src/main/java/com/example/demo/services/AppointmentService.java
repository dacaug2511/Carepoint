package com.example.demo.services;


import com.example.demo.dto.AvailableSlotResponse;
import com.example.demo.dto.BookAppointmentRequest;
import com.example.demo.dto.RescheduleRequest;
import com.example.demo.entities.Appointment;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentService {

    List<AvailableSlotResponse>
    getAvailableSlots(int doctorId, LocalDate date);
//    Appointment bookAppointment(BookAppointmentRequest request);
    Appointment cancelAppointment(int appointmentId);
    List<Appointment> getPatientAppointments(int patientId);
    List<Appointment> getDoctorAppointmentsByDate(
            int doctorId,
            LocalDate date
    );
	Appointment confirmAppointmentAfterPayment(BookAppointmentRequest request);
	Appointment rescheduleAppointment(int appointmentId,RescheduleRequest request);
	List<LocalDate> getAvailableDatesForReschedule(int doctorId);

}
