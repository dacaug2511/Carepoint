package com.example.demo.services;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.DoctorDTO;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Patient;
import com.example.demo.repositories.DoctorRepository;
import com.example.demo.repositories.PatientRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private PatientRepository patientRepo;

    @Override
    public List<DoctorDTO> getAllDoctors() {
        return doctorRepo.findAll().stream().map(d -> {
            DoctorDTO dto = new DoctorDTO();

            dto.setDoctorId(d.getDoctorId());
            dto.setFirstName(d.getUser().getFirstName());
            dto.setLastName(d.getUser().getLastName());
            dto.setExperience(d.getExperience());
            dto.setConsultationFee(d.getConsultationFee());
            dto.setStatus(d.getStatus().name());

           
            if (d.getSpecialization() != null) {
                dto.setSpecializationName(
                    d.getSpecialization().getSpecializationName()
                );
            }

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void approveDoctor(Integer doctorId) {
        Doctor d = doctorRepo.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        d.setStatus(Doctor.Status.ACTIVE);
        doctorRepo.save(d);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepo.findAll();
    }
}

