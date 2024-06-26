package com.example.studentmanagement.repository;

import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.model.Lecturer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LecturerRepository extends JpaRepository<Lecturer, Integer> {
    Lecturer findByUserName(String userName);
}
