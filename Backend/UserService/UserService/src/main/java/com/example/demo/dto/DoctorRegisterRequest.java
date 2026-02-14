package com.example.demo.dto;

import java.math.BigDecimal;


public class DoctorRegisterRequest {

    // USER fields
    public String uname;
    public String firstName;
    public String lastName;
    public String password;
    public String phone;
    public String email;
    public String address;
    public String aadhaar;

    // DOCTOR fields
    public Integer specializationId;
//    public Specialization specialization;
    public String baseQualification;
    public String postQualification;
    public Integer experience;
    public BigDecimal consultationFee;
	public String getUname() {
		return uname;
	}
	public void setUname(String uname) {
		this.uname = uname;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getAadhaar() {
		return aadhaar;
	}
	public void setAadhaar(String aadhaar) {
		this.aadhaar = aadhaar;
	}
//	public Specialization getSpecialization() {
//		return specialization;
//	}
//	public void setSpecialization(Specialization specialization) {
//		this.specialization = specialization;
//	}
	public String getBaseQualification() {
		return baseQualification;
	}
	public Integer getSpecializationId() {
		return specializationId;
	}
	public void setSpecializationId(Integer specializationId) {
		this.specializationId = specializationId;
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
    
    
    
}