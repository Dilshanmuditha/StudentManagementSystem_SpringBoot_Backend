package com.example.studentmanagement.controller.student;

import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.service.StudentService;
import com.example.studentmanagement.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class StudentController {
    @Autowired
    StudentServiceImpl studentServiceImpl;
    @Autowired
    StudentService studentService;
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    String helloWorld(){
        return "My First Sprint Boot api";
    }
    @RequestMapping(value = "/student", method = RequestMethod.POST)
    public Student save(@RequestBody Student student){
        return studentServiceImpl.save(student);
    }

    @RequestMapping(value = "/student/{id}", method = RequestMethod.PUT)
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
