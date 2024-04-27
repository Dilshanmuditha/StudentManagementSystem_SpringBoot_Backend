package com.example.studentmanagement.repository;

import com.example.studentmanagement.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

    public interface AdminRepository  extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email);

}
