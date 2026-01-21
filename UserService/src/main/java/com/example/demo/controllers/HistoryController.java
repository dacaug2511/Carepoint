package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.History;
import com.example.demo.services.HistoryService;

@RestController
@RequestMapping("/history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping("/getall")
    public List<History> getAll() {
        return historyService.getAll();
    }
    
    @PostMapping("/save")
    public History save(@RequestBody History history) {
        return historyService.save(history);
    }
}
