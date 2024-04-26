package com.example.studentmanagement.controller.module;

import com.example.studentmanagement.model.Module;
import com.example.studentmanagement.service.ModuleService;
import com.example.studentmanagement.service.ModuleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
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

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class ModuleController {
    @Autowired
    ModuleServiceImpl moduleServiceImpl;
    @Autowired
    ModuleService moduleService;
    @RequestMapping(value = "/module", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Module save(@RequestBody Module module){
        return moduleServiceImpl.save(module);
    }

    @RequestMapping(value = "/module/{id}", method = RequestMethod.PUT,consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Module> updateModule(@PathVariable int id, @RequestBody Module module) {
        Module updateModule = moduleServiceImpl.update(id, module);
        return ResponseEntity.ok(updateModule);
    }
    @RequestMapping(value = "/module", method = RequestMethod.GET)
    public List<Module> getModule(){return moduleServiceImpl.getModule();
    }

    @RequestMapping(value = "/module/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> viewModule(@PathVariable Integer id) {
        try {
            Optional<Module> viewModule = moduleServiceImpl.view(id);
            if (viewModule.isPresent()) {
                return ResponseEntity.ok(viewModule.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Module not found with ID: " + id);
            }
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @RequestMapping(value = "/module/{id}/materials/upload", method = RequestMethod.PUT, consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Module> uploadFile(@PathVariable int id,@RequestParam("file") MultipartFile file) {
        Module uploadFile = moduleServiceImpl.uploadFile(id,file);
        return ResponseEntity.ok(uploadFile);
    }
}
