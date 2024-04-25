package com.example.studentmanagement.service;

import com.example.studentmanagement.model.Course;
import com.example.studentmanagement.repository.CourseRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    CourseRepository courseRepository;
    public Course save(Course course){return courseRepository.save(course);}
    public List<Course> getCourse(){return courseRepository.findAll();}

    public Course update(int id, Course newCourseData) {

        Course existingCourse = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));

        // Update existing student data with new data
        existingCourse.setCode(newCourseData.getCode());
        existingCourse.setLecturer_id(newCourseData.getLecturer_id());
        existingCourse.setName(newCourseData.getName());

        return courseRepository.save(existingCourse);
    }

    public Optional<Course> view(Integer id) {
        return courseRepository.findById(id);
    }
}
