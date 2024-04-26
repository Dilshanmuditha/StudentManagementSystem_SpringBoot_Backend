package com.example.studentmanagement.controller.lecturer;

import com.example.studentmanagement.errorHandling.UniqueError;
import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.model.Lecturer;
import com.example.studentmanagement.security.AuthRequest;
import com.example.studentmanagement.service.LectureService;
import com.example.studentmanagement.service.LectureServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class LectureController {
    @Autowired
    LectureServiceImpl lectureServiceImpl;
    @Autowired
    LectureService lecturerService;
    @RequestMapping(value = "/lecturer", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public ResponseEntity<?> save(@RequestBody Lecturer lecturer){
        try {
            Lecturer savedLecture = lectureServiceImpl.save(lecturer);
            return ResponseEntity.ok(savedLecture);
        } catch (DataIntegrityViolationException ex) {
            String errorMessage = UniqueError.extractErrorMessage(ex);
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @RequestMapping(value = "/lecturer/{id}", method = RequestMethod.PUT,consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Lecturer> updateLecturer(@PathVariable int id, @RequestBody Lecturer lecturer) {
        Lecturer updateLecturer = lectureServiceImpl.update(id, lecturer);
        return ResponseEntity.ok(updateLecturer);
    }
    @RequestMapping(value = "/lecturer", method = RequestMethod.GET)
    public List<Lecturer> getLecturer(){
        return lectureServiceImpl.getLecturer();
    }

    @RequestMapping(value = "/lecturer/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> viewLecturer(@PathVariable Integer id) {
        try {
            Optional<Lecturer> viewLecturer = lectureServiceImpl.view(id);
            if (viewLecturer.isPresent()) {
                return ResponseEntity.ok(viewLecturer.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lecturer not found with ID: " + id);
            }
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/lecture/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        // Delegate login logic to the service layer
        return lectureServiceImpl.login(authRequest.getUserName(), authRequest.getPassword());
    }
}
