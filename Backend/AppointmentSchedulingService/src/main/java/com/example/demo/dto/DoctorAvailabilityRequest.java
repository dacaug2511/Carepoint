package com.example.demo.dto;

import java.time.LocalTime;
import java.util.List;

public class DoctorAvailabilityRequest {

    private int doctorId;
    private List<String> days;
    private LocalTime availableFrom;
    private LocalTime availableTo;
    
 // getters & setters
    
	public int getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}
	public List<String> getDays() {
		return days;
	}
	public void setDays(List<String> days) {
		this.days = days;
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

