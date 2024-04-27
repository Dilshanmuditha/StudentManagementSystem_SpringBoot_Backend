package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Module;

import java.util.List;

public interface ModuleService {
    Module save(Module module);
    List<Module> getModulesByCourseId(Long courseId);
}
