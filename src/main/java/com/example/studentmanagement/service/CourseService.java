package com.example.studentmanagement.service;


import com.example.studentmanagement.model.Course;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CourseService {

    private List<Course> courses = new ArrayList<>(Arrays.asList(
            new Course ("SpringBoot", "Spring Framework", "Spring Framework Description"),
            new Course("CoreJava", "Core Java Knowledge", "Core Java Framework"),
            new Course("Python", "Python Framework", "Python Description")
    ));

    public List<Course> getAllCourses(){
        return courses;
    }

    public Course getCourse (String id){
        return courses.stream().filter(c  -> c.getId().equals(id).findFirst().get());
    }

    public void addCourse(Course course){
        courses.add(course);

    }

    public void updateCourse(String id, Course course){
        for (int i = 0; i < courses.size(); i++){
            Course c = courses.get(i);
            if (c.getId().equals(id)){
                courses.set(i,course);
                return;
            }
        }
    }

    public void deleteCourse(String id){
        courses.removeIf(c  -> c.getId().equals(id));
    }
}
