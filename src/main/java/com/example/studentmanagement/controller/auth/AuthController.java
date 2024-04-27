package com.example.studentmanagement.controller.auth;

import com.example.studentmanagement.security.AuthRequest;
import com.example.studentmanagement.service.AdminServiceImpl;
import com.example.studentmanagement.service.LectureServiceImpl;
import com.example.studentmanagement.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class AuthController {
    @Autowired
    StudentServiceImpl studentServiceImpl;
    @Autowired
    LectureServiceImpl lectureServiceImpl;
    @Autowired
    AdminServiceImpl adminServiceImpl;
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        if (authRequest.getUserName().startsWith("std_")) {
            // Delegate login logic to the Student
            return studentServiceImpl.login(authRequest.getUserName(), authRequest.getPassword());
        } else if (authRequest.getUserName().startsWith("lec_")) {
            // Delegate login logic to the Lecturer
            return lectureServiceImpl.login(authRequest.getUserName(), authRequest.getPassword());
        }
        return adminServiceImpl.login(authRequest.getUserName(), authRequest.getPassword());
    }
}
