package com.example.studentmanagement.service;
import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.StudentRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentRepository studentRepository;
    public Student save(Student student){return studentRepository.save(student);}
    public List<Student> getStudents(){return studentRepository.findAll();}

    public Student update(int id, Student newStudentData) {

        Student existingStudent = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        // Update existing student data with new data
        existingStudent.setName(newStudentData.getName());
        existingStudent.setPassword(newStudentData.getPassword());
        existingStudent.setUserName(newStudentData.getUserName());
        existingStudent.setMobile(newStudentData.getMobile());
        existingStudent.setEmail(newStudentData.getEmail());
        existingStudent.setNic(newStudentData.getNic());
//        existingStudent.setImage(newStudentData.getImage());
        existingStudent.setAddress(newStudentData.getAddress());

        return studentRepository.save(existingStudent);
    }

    public Optional<Student> view(Integer id) {
        return studentRepository.findById(id);
    }
}
