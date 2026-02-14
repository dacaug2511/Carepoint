package com.example.demo.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserServiceClient {

    @Autowired
    private RestTemplate restTemplate;
    
    

    // change ports if needed
    private static final String USER_SERVICE_URL = "http://localhost:8080/api/validate";

    public boolean patientExists(int patientId) {
        return Boolean.TRUE.equals(
                restTemplate.getForObject(
                        USER_SERVICE_URL + "/patient/" + patientId,
                        Boolean.class
                )
        );
    }

    public boolean doctorExistsAndActive(int doctorId) {
        return Boolean.TRUE.equals(
                restTemplate.getForObject(
                        USER_SERVICE_URL + "/doctor/" + doctorId,
                        Boolean.class
                )
        );
    }
}
