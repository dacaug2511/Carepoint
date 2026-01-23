package com.example.demo.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;


@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer doctorId;

    @ManyToOne
    @JoinColumn(name = "uid")
    private User user;

    @Column(name = "specialization_id", nullable = false)
    private Integer specializationId;

    private String baseQualification;
    private String postQualification;
    private Integer experience;
    private BigDecimal consultationFee;

    @Enumerated(EnumType.STRING)
    private Status status;

//    private Date registrationDate;

    public enum Status {
        Active, Inactive
    }

    public Doctor() {}

    // getters and setters
    public Integer getDoctorId() { return doctorId; }
    public void setDoctorId(Integer doctorId) { this.doctorId = doctorId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Integer getSpecializationId() { return specializationId; }
    public void setSpecializationId(Integer specializationId) { this.specializationId = specializationId; }

    public String getBaseQualification() { return baseQualification; }
    public void setBaseQualification(String baseQualification) { this.baseQualification = baseQualification; }

    public String getPostQualification() { return postQualification; }
    public void setPostQualification(String postQualification) { this.postQualification = postQualification; }

    public Integer getExperience() { return experience; }
    public void setExperience(Integer experience) { this.experience = experience; }

    public BigDecimal getConsultationFee() { return consultationFee; }
    public void setConsultationFee(BigDecimal consultationFee) { this.consultationFee = consultationFee; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

//    public Date getRegistrationDate() { return registrationDate; }
//    public void setRegistrationDate(Date registrationDate) { this.registrationDate = registrationDate; }
}