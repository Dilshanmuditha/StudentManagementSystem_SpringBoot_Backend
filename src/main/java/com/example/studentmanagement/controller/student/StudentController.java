package com.example.studentmanagement.controller.student;

import com.example.studentmanagement.errorHandling.UniqueError;
import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.security.AuthRequest;
import com.example.studentmanagement.service.StudentService;
import com.example.studentmanagement.service.StudentServiceImpl;
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
public class StudentController {
    @Autowired
    StudentServiceImpl studentServiceImpl;
    @Autowired
    StudentService studentService;
    @RequestMapping(value = "/student", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public ResponseEntity<?>  save(@RequestBody Student student){
        try {
            Student savedStudent = studentServiceImpl.save(student);
            return ResponseEntity.ok(savedStudent);
        } catch (DataIntegrityViolationException ex) {
            String errorMessage = UniqueError.extractErrorMessage(ex);
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @RequestMapping(value = "/student/{id}", method = RequestMethod.PUT, consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) {
        Student updatedStudent = studentServiceImpl.update(id, student);
        return ResponseEntity.ok(updatedStudent);
    }
    @RequestMapping(value = "/students", method = RequestMethod.GET)
    public List<Student> getStudents(){
        return studentServiceImpl.getStudents();
    }

    @RequestMapping(value = "/students/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> viewAdmin(@PathVariable Integer id) {
        try {
            Optional<Student> viewStudent = studentServiceImpl.view(id);
            if (viewStudent.isPresent()) {
                return ResponseEntity.ok(viewStudent.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found with ID: " + id);
            }
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

}
