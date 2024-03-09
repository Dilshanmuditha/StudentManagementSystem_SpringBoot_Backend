package com.example.studentmanagement.controller.student;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.service.StudentService;
import com.example.studentmanagement.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StudentController {
    @Autowired
    StudentServiceImpl studentServiceImpl;
    @Autowired
    StudentService studentService;
    @RequestMapping(value = "/student", method = RequestMethod.POST)
    public Student save(@RequestBody Student student){
        return studentServiceImpl.save(student);
    }

    @RequestMapping(value = "/student/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) {
        Student updatedStudent = studentServiceImpl.update(id, student);
        return ResponseEntity.ok(updatedStudent);
    }
}
