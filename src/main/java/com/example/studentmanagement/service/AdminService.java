package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Admin;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface AdminService {
    Admin save(Admin admin);

//    Admin loadUserByUsername(String email) throws UsernameNotFoundException;
}
