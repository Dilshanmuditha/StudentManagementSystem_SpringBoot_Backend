package com.example.studentmanagement.repository;

import com.example.studentmanagement.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Integer>{
    List<Module> findAllByCourseId(Long courseId);
}
