package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.repository.AdminRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
@Service
public class AdminServiceImple implements AdminService {
    @Autowired
    AdminRepository adminRepository;
    public Admin save(Admin admin){return adminRepository.save(admin);}

    public Admin update(int id, Admin newAdminData) {
        Admin existingAdmin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));

        // Update existing admin data with new data
        existingAdmin.setName(newAdminData.getName());
        existingAdmin.setPassword(newAdminData.getPassword());
        existingAdmin.setEmail(newAdminData.getEmail());

        return adminRepository.save(existingAdmin);
    }

//    @Override
//    public Admin loadUserByUsername(String email) throws UsernameNotFoundException {
//        Admin user = adminRepository.findByUsername(email);
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found with username: " + email);
//        }
//        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),);
//    }
}
