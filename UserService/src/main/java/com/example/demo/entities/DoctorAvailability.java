package com.example.demo.entities;

import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctor_availability")
public class DoctorAvailability {

    @EmbeddedId
    private DoctorAvailabilityId id;

    @ManyToOne
    @MapsId("doctorId")
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @Column(name = "available_from", nullable = false)
    private LocalTime availableFrom;

    @Column(name = "available_to", nullable = false)
    private LocalTime availableTo;
    

 // getters & setters
	public DoctorAvailabilityId getId() {
		return id;
	}

	public void setId(DoctorAvailabilityId id) {
		this.id = id;
	}

	public Doctor getDoctor() {
		return doctor;
	}

	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}

	public LocalTime getAvailableFrom() {
		return availableFrom;
	}

	public void setAvailableFrom(LocalTime availableFrom) {
		this.availableFrom = availableFrom;
	}

	public LocalTime getAvailableTo() {
		return availableTo;
	}

	public void setAvailableTo(LocalTime availableTo) {
		this.availableTo = availableTo;
	}

    
}

