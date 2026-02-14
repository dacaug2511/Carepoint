package com.example.demo.dto;

import java.math.BigDecimal;

public class DoctorDTO {

    private Integer doctorId;
    private String firstName;
    private String lastName;
    private String specializationName;
    private int experience;
    private BigDecimal consultationFee;
    private String status;
    
 // getters & setters
	public Integer getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(Integer integer) {
		this.doctorId = integer;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getSpecializationName() {
		return specializationName;
	}
	public void setSpecializationName(String specializationName) {
		this.specializationName = specializationName;
	}
	public int getExperience() {
		return experience;
	}
	public void setExperience(int experience) {
		this.experience = experience;
	}
	public BigDecimal getConsultationFee() {
		return consultationFee;
	}
	public void setConsultationFee(BigDecimal bigDecimal) {
		this.consultationFee = bigDecimal;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

    
    
}

