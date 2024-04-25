package com.example.studentmanagement.controller.materials;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class MaterialsController {
    @Value("${file.upload-dir}")
    private String uploadDir;
    @RequestMapping(value = "/materials/upload", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public String uploadFile(@RequestParam("file") MultipartFile file) {
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

        return "done"; // Redirect to a success page
    }
}
