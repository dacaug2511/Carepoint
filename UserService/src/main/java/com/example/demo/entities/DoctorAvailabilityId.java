package com.example.demo.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class DoctorAvailabilityId implements Serializable {

    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "day")
    private String day;

    public DoctorAvailabilityId() {}

    public DoctorAvailabilityId(Integer doctorId, String day) {
        this.doctorId = doctorId;
        this.day = day;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DoctorAvailabilityId that = (DoctorAvailabilityId) o;

        if (!doctorId.equals(that.doctorId)) return false;
        return day.equals(that.day);
    }

    @Override
    public int hashCode() {
        int result = doctorId.hashCode();
        result = 31 * result + day.hashCode();
        return result;
    }

 // getters & setters
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


