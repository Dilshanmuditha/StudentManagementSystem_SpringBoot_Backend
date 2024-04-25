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
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + id));

        // Update existing module data with new data
        existingModule.setName(newModuleData.getName());
        existingModule.setCode(newModuleData.getCode());
        existingModule.setCourse_id(newModuleData.getCourse_id());

        return moduleRepository.save(existingModule);
    }

    public Optional<Module> view(Integer id) {return moduleRepository.findById(id);

    }
}
