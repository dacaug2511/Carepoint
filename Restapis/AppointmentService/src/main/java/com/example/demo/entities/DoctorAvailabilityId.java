package com.example.demo.entities;

import java.io.Serializable;
import java.util.Objects;

public class DoctorAvailabilityId implements Serializable {

    private Integer doctorId;
    private String day;

    public DoctorAvailabilityId() {}

    public DoctorAvailabilityId(Integer doctorId, String day) {
        this.doctorId = doctorId;
        this.day = day;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DoctorAvailabilityId)) return false;
        DoctorAvailabilityId that = (DoctorAvailabilityId) o;
        return Objects.equals(doctorId, that.doctorId) &&
               day == that.day;
    }

    @Override
    public int hashCode() {
        return Objects.hash(doctorId, day);
    }

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}
    
}
