package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.repository.AdminRepository;
import com.example.studentmanagement.security.JwtTokenService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImple implements AdminService {
    @Autowired
    AdminRepository adminRepository;
    @Autowired
    private JwtTokenService jwtTokenService;
    public List<Admin> getAdmins(){return adminRepository.findAll();}

    public Admin save(Admin admin){return adminRepository.save(admin);}

    public Admin update(int id, Admin newAdminData) {
        Admin existingAdmin = adminRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));

        // Update existing admin data with new data
        existingAdmin.setName(newAdminData.getName());
        existingAdmin.setPassword(newAdminData.getPassword());
        existingAdmin.setEmail(newAdminData.getEmail());
        existingAdmin.setMobile_number(newAdminData.getMobile_number());

        return adminRepository.save(existingAdmin);
    }

    public Optional<Admin> view(Integer id) {
        return adminRepository.findById(id);
    }
    public ResponseEntity<?> login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && admin.getPassword().equals(password)) {
            // Authentication successful, generate JWT token
//            String token = jwtTokenService.generateToken(email);
            return ResponseEntity.ok(admin);
        } else {
            // Authentication failed
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
