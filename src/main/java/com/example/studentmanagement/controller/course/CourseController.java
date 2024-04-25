package com.example.studentmanagement.controller.course;

import com.example.studentmanagement.model.Course;
import com.example.studentmanagement.service.CourseService;
import com.example.studentmanagement.service.CourseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
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
public class CourseController {
    @Autowired
    CourseServiceImpl courseServiceImpl;
    @Autowired
    CourseService courseService;
    @RequestMapping(value = "/course", method = RequestMethod.POST, consumes = MediaType.ALL_VALUE)
    public Course save(@RequestBody Course course){
        return courseServiceImpl.save(course);
    }

    @RequestMapping(value = "/course/{id}", method = RequestMethod.PUT,consumes = MediaType.ALL_VALUE)
    public ResponseEntity<Course> updateLecturer(@PathVariable int id, @RequestBody Course course) {
        Course updateCourse = courseServiceImpl.update(id, course);
        return ResponseEntity.ok(updateCourse);
    }
    @RequestMapping(value = "/course", method = RequestMethod.GET)
    public List<Course> getCourse(){
        return courseServiceImpl.getCourse();
    }

    @RequestMapping(value = "/course/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> viewCourse(@PathVariable Integer id) {
        try {
            Optional<Course> viewCourse = courseServiceImpl.view(id);
            if (viewCourse.isPresent()) {
                return ResponseEntity.ok(viewCourse.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found with ID: " + id);
            }
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}
