package com.example.demo.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @Column(name = "doctor_id")
    private Integer doctorId;

    @Column(name = "uid", nullable = false)
    private Integer userId;

    @Column(name = "specialization_id", nullable = false)
    private Integer specializationId;

    @Column(name = "base_qualification")
    private String baseQualification;

    @Column(name = "post_qualification")
    private String postQualification;

    private Integer experience;

    @Column(name = "consultation_fee")
    private BigDecimal consultationFee;

    @Enumerated(EnumType.STRING)
    private DoctorStatus status;

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getSpecializationId() {
		return specializationId;
	}

	public void setSpecializationId(Integer specializationId) {
		this.specializationId = specializationId;
	}

	public String getBaseQualification() {
		return baseQualification;
	}

	public void setBaseQualification(String baseQualification) {
		this.baseQualification = baseQualification;
	}

	public String getPostQualification() {
		return postQualification;
	}

	public void setPostQualification(String postQualification) {
		this.postQualification = postQualification;
	}

	public Integer getExperience() {
		return experience;
	}

	public void setExperience(Integer experience) {
		this.experience = experience;
	}

	public BigDecimal getConsultationFee() {
		return consultationFee;
	}

	public void setConsultationFee(BigDecimal consultationFee) {
		this.consultationFee = consultationFee;
	}

	public DoctorStatus getStatus() {
		return status;
	}

	public void setStatus(DoctorStatus status) {
		this.status = status;
	}

    
}
