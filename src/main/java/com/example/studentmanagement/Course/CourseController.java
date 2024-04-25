package com.example.studentmanagement.Course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class CourseController {


    @Autowired
    private CourseService courseService;

    @RequestMapping("/courses")
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }

    @RequestMapping("/courses/{id}")
    public Course getCourse (@PathVariable String id){
        return courseService.getCourse(id);
    }

    @RequestMapping (method = RequestMethod.POST, value = "/courses")
    public void addCourse(@RequestBody Course course){
        courseService.addCourse(course);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/courses/{id}")
    public void updateCourse(@RequestBody Course course, @PathVariable String id){
        courseService.updateCourse(id, course);
    }


    @RequestMapping(method = RequestMethod.DELETE, value = "/courses/{id}")
    public void deleteCourse(@PathVariable String id){
        courseService.deleteCourse(id);
    }


}
