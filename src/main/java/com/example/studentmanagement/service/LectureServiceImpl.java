package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Lecturer;
import com.example.studentmanagement.repository.LecturerRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class LectureServiceImpl implements LectureService{
    @Autowired
    LecturerRepository lecturerRepository;
    public Lecturer save(Lecturer lecturer){return lecturerRepository.save(lecturer);}
    public List<Lecturer> getLecturer(){return lecturerRepository.findAll();}

    public Lecturer update(int id, Lecturer newLecturerData) {

        Lecturer existingLecturer = lecturerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lecturer not found with id: " + id));

        // Update existing student data with new data
        existingLecturer.setName(newLecturerData.getName());
        existingLecturer.setPassword(newLecturerData.getPassword());
        existingLecturer.setUserName(newLecturerData.getUserName());
        existingLecturer.setMobile(newLecturerData.getMobile());
        existingLecturer.setEmail(newLecturerData.getEmail());
        existingLecturer.setNic(newLecturerData.getNic());
//        existingStudent.setImage(newStudentData.getImage());
        existingLecturer.setAddress(newLecturerData.getAddress());

        return lecturerRepository.save(existingLecturer);
    }

    public Optional<Lecturer> view(Integer id) {
        return lecturerRepository.findById(id);
    }
}
