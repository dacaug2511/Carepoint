package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Report;
import com.example.demo.repositories.ReportRepository;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepo;

    public Report save(Report report) {
        return reportRepo.save(report);
    }

}
