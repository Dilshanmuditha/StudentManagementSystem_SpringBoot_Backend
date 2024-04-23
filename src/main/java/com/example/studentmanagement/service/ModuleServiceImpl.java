package com.example.studentmanagement.service;
import com.example.studentmanagement.model.Lecturer;
import com.example.studentmanagement.model.Module;
import com.example.studentmanagement.repository.LecturerRepository;
import com.example.studentmanagement.repository.ModuleRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ModuleServiceImpl implements ModuleService{
    @Autowired
    ModuleRepository moduleRepository;
    public Module save(Module module){return moduleRepository.save(module);}
    public List<Module> getModule(){return moduleRepository.findAll();}

    public Module update(int id, Module newModuleData) {

        Module existingModule = moduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lecturer not found with id: " + id));

        // Update existing student data with new data
        existingModule.setName(newModuleData.getName());
        existingModule.setPassword(newModuleData.getPassword());
        existingModule.setUserName(newModuleData.getUserName());
        existingModule.setMobile(newModuleData.getMobile());
        existingModule.setCode(newModuleData.getCode());
        existingModule.setAddress(newModuleData.getAddress());

        return moduleRepository.save(existingModule);
    }

    public Optional<Module> view(Integer id) {return moduleRepository.findById(id);

    }
}
