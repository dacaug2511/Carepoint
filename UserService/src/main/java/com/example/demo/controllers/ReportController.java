package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Report;
import com.example.demo.services.ReportService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;


    @PostMapping("/save")
    public Report save(@RequestBody Report report) {
        return reportService.save(report);
    }
}
