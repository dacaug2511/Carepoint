package com.example.demo.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Feedback;
import com.example.demo.services.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    
    @PostMapping("/save")
    public Feedback save(@RequestBody Feedback feedback) {
        return feedbackService.save(feedback);
    }
}
