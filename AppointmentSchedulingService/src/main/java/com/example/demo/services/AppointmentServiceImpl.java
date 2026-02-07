package com.example.demo.services;



import com.example.demo.client.UserServiceClient;
import com.example.demo.dto.AvailableSlotResponse;
import com.example.demo.dto.BookAppointmentRequest;
import com.example.demo.dto.RescheduleRequest;
import com.example.demo.entities.Appointment;
import com.example.demo.entities.AppointmentStatus;
import com.example.demo.entities.Bill;
import com.example.demo.entities.DoctorAvailability;
import com.example.demo.repositories.AppointmentRepository;
import com.example.demo.repositories.BillRepository;
import com.example.demo.repositories.DoctorAvailabilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private DoctorAvailabilityRepository availabilityRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired
    private BillRepository billRepository;

    @Autowired
    private UserServiceClient userServiceClient;


    @Override
    public List<AvailableSlotResponse>
    getAvailableSlots(int doctorId, LocalDate date) {

        // 1️⃣ Find day name (Monday, Tuesday...)
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        String dayName =
                capitalize(dayOfWeek.name().toLowerCase());

        // 2️⃣ Fetch doctor availability for that day
        List<DoctorAvailability> availabilityList =
                availabilityRepository.findByIdDoctorId(doctorId);

        DoctorAvailability availabilityForDay = null;

        for (DoctorAvailability availability : availabilityList) {
            if (availability.getId().getDay().equals(dayName)) {
                availabilityForDay = availability;
                break;
            }
        }

        // ❌ Doctor not available on this day
        if (availabilityForDay == null) {
            return Collections.emptyList();
        }

        // 3️⃣ Generate all 30-minute slots
        List<LocalTime> allSlots =
                generateSlots(
                        availabilityForDay.getAvailableFrom(),
                        availabilityForDay.getAvailableTo()
                );

        // 4️⃣ Fetch already booked slots
        List<Appointment> bookedAppointments =
        		appointmentRepository.findByDoctorIdAndAppointmentDateAndStatusIn(
        	        doctorId,
        	        date,
        	        List.of(
        	            AppointmentStatus.SCHEDULED,
        	            AppointmentStatus.RESCHEDULED
        	        )
        	    );



        Set<LocalTime> bookedSlots = new HashSet<>();
        for (Appointment appointment : bookedAppointments) {
            bookedSlots.add(appointment.getSlotTime());
        }

        // 5️⃣ Remove booked slots
        List<AvailableSlotResponse> availableSlots =
                new ArrayList<>();

        for (LocalTime slot : allSlots) {
            if (!bookedSlots.contains(slot)) {

                AvailableSlotResponse response =
                        new AvailableSlotResponse();
                response.setDate(date);
                response.setSlotTime(slot);

                availableSlots.add(response);
            }
        }

        return availableSlots;
    }

    // ---------- helper methods ----------

    private List<LocalTime>
    generateSlots(LocalTime start, LocalTime end) {

        List<LocalTime> slots = new ArrayList<>();

        LocalTime current = start;

        while (current.plusMinutes(30).compareTo(end) <= 0) {
            slots.add(current);
            current = current.plusMinutes(30);
        }

        return slots;
    }

    private String capitalize(String value) {
        return value.substring(0, 1).toUpperCase()
                + value.substring(1);
    }
    


    
    @Override
    public Appointment cancelAppointment(int appointmentId) {

        Appointment appointment =
                appointmentRepository.findById(appointmentId)
                        .orElseThrow(() ->
                                new RuntimeException("Appointment not found"));

        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            throw new RuntimeException("Appointment already cancelled");
        }

        appointment.setStatus(AppointmentStatus.CANCELLED);

        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getPatientAppointments(int patientId) {

        return appointmentRepository
                .findByPatientIdOrderByAppointmentDateDesc(patientId);
    }

    @Override
    public List<Appointment> getDoctorAppointmentsByDate(
            int doctorId,
            LocalDate date
    ) {

        return appointmentRepository
                .findByDoctorIdAndAppointmentDateOrderBySlotTime(
                        doctorId, date
                );
    }
    
    @Transactional
    @Override
    public Appointment confirmAppointmentAfterPayment(
            BookAppointmentRequest request) {
    	 // ✅ NEW: PATIENT VALIDATION
        if (!userServiceClient.patientExists(request.getPatientId())) {
            throw new RuntimeException("Patient does not exist");
        }

        // ✅ NEW: DOCTOR VALIDATION
        if (!userServiceClient.doctorExistsAndActive(request.getDoctorId())) {
            throw new RuntimeException("Doctor not found or inactive");
        }

        // 1️⃣ FINAL SLOT CHECK (prevent race condition)
        boolean exists =
                appointmentRepository
                        .existsByDoctorIdAndAppointmentDateAndSlotTime(
                                request.getDoctorId(),
                                request.getAppointmentDate(),
                                request.getSlotTime()
                        );

        if (exists) {
            throw new RuntimeException("Slot already booked");
        }

        // 2️⃣ DOCTOR AVAILABILITY CHECK  ✅ (PUT HERE)
        DayOfWeek dayOfWeek =
                request.getAppointmentDate().getDayOfWeek();

        String dayName =
                dayOfWeek.name().substring(0,1).toUpperCase()
              + dayOfWeek.name().substring(1).toLowerCase();

        boolean available =
                availabilityRepository
                        .findByIdDoctorId(request.getDoctorId())
                        .stream()
                        .anyMatch(a ->
                                a.getId().getDay().equals(dayName) &&
                                !request.getSlotTime().isBefore(a.getAvailableFrom()) &&
                                request.getSlotTime()
                                        .plusMinutes(30)
                                        .isBefore(
                                            a.getAvailableTo().plusSeconds(1)
                                        )
                        );

        if (!available) {
            throw new RuntimeException(
                    "Doctor not available on selected date/time"
            );
        }

        // 3️⃣ SAVE APPOINTMENT ✅
        Appointment appointment = new Appointment();
        appointment.setPatientId(request.getPatientId());
        appointment.setDoctorId(request.getDoctorId());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setSlotTime(request.getSlotTime());
        appointment.setStatus(AppointmentStatus.SCHEDULED);
        appointment.setCreatedAt(LocalDateTime.now());

        Appointment savedAppointment =
                appointmentRepository.save(appointment);

        // 4️⃣ SAVE BILL ✅
        Bill bill = new Bill();
        bill.setAppointmentId(savedAppointment.getAppointmentId());
        bill.setTotalAmount(request.getAmount());
        bill.setBillingDate(LocalDate.now());
        bill.setTransactionId(request.getTransactionId());
        bill.setPaymentMode(request.getPaymentMode());

        billRepository.save(bill);

        return savedAppointment;
    }

    @Override
    public List<LocalDate> getAvailableDatesForReschedule(int doctorId) {

        LocalDate today = LocalDate.now();
        LocalDate lastDate = today.plusDays(7);

        // 1️⃣ Get doctor availability days
        List<DoctorAvailability> availabilityList =
                availabilityRepository.findByIdDoctorId(doctorId);

        Set<DayOfWeek> availableDays = new HashSet<>();

        for (DoctorAvailability availability : availabilityList) {
            availableDays.add(
                DayOfWeek.valueOf(
                    availability.getId().getDay().toUpperCase()
                )
            );
        }

        // 2️⃣ Filter valid dates
        List<LocalDate> validDates = new ArrayList<>();

        LocalDate date = today;
        while (!date.isAfter(lastDate)) {

            // ✅ Only future (today included)
            // ✅ Only doctor available days
            if (availableDays.contains(date.getDayOfWeek())) {
                validDates.add(date);
            }

            date = date.plusDays(1);
        }

        return validDates;
    }

    
    @Transactional
    @Override
    public Appointment rescheduleAppointment(
            int appointmentId,
            RescheduleRequest request) {

        Appointment appointment =
            appointmentRepository.findById(appointmentId)
                .orElseThrow(() ->
                    new RuntimeException("Appointment not found"));

        if (appointment.getStatus() == AppointmentStatus.CANCELLED) {
            throw new RuntimeException("Cancelled appointment cannot be rescheduled");
        }
        
        LocalDate newDate = request.getNewDate();
        LocalTime newSlot = request.getNewSlot();

        if (newDate == null || newSlot == null) {
            throw new RuntimeException("Date and slot must be provided");
        }

        // prevent double booking
        boolean exists =
            appointmentRepository
                .existsByDoctorIdAndAppointmentDateAndSlotTime(
                    appointment.getDoctorId(),
                    newDate,
                    newSlot
                );

        if (exists) {
            throw new RuntimeException("Slot already booked");
        }

        appointment.setAppointmentDate(newDate);
        appointment.setSlotTime(newSlot);
        appointment.setStatus(AppointmentStatus.RESCHEDULED);

        return appointmentRepository.save(appointment);
    }



}
