package com.example.studentmanagement.controller;

import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.service.AdminServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

//    @Autowired
//    private AuthenticationManager authenticationManager;
//
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;
//
//    @Autowired
//    private AdminServiceImple adminServiceImple;
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody Admin admin) {
//        final Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(admin.getEmail(), admin.getPassword())
//        );
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        final Admin userDetails = adminServiceImple.loadUserByUsername(admin.getEmail());
//        final String token = jwtTokenUtil.generateToken(userDetails);
//
//        return ResponseEntity.ok(new JwtResponse(token));
//    }
}
