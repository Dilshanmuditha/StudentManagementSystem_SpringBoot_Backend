package com.example.studentmanagement.service;
import com.example.studentmanagement.model.Lecturer;
import com.example.studentmanagement.model.Module;
import com.example.studentmanagement.repository.LecturerRepository;
import com.example.studentmanagement.repository.ModuleRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ModuleServiceImpl implements ModuleService{
    @Value("${file.upload-dir}")
    private String uploadDir;

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
        existingModule.setContent(newModuleData.getContent());

        return moduleRepository.save(existingModule);
    }

    public Optional<Module> view(Integer id) {return moduleRepository.findById(id);}

    public Module uploadFile(int id, MultipartFile file) {
        // Make sure the upload directory exists
        File directory = new File(uploadDir);

        if (!directory.exists()) {
            directory.mkdirs(); // Create the directory if it doesn't exist
        }

        // Get the original filename
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());

        // Generate a unique filename using UUID
        String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFilename;

        // Construct the target file path
        Path targetLocation = Paths.get(uploadDir + File.separator + uniqueFileName);

        try {
            // Copy file to the target location
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace(); // Handle the error as needed
        }
        // Save the file path in the database
        String filePath = uploadDir + File.separator + uniqueFileName;
        Module existingModule = moduleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + id));
        existingModule.setFile_path(filePath);
        return moduleRepository.save(existingModule);
    }
}
