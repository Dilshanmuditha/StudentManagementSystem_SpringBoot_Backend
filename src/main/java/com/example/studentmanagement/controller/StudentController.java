package com.example.studentmanagement.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    String helloWorld(){
        return "My First Sprint Boot api";
    }
}
