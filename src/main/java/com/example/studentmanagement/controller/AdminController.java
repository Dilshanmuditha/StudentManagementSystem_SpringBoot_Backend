package com.example.studentmanagement.controller;

import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.service.AdminService;
import com.example.studentmanagement.service.AdminServiceImple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {

    @Autowired
    AdminServiceImple adminServiceImple;
    @Autowired
    AdminService adminService;

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    String helloWorld(){
        return "My First Sprint Boot api";
    }

    @RequestMapping(value = "/admin", method = RequestMethod.POST)
    public Admin save(@RequestBody Admin admin){
        return adminServiceImple.save(admin);
    }

    @RequestMapping(value = "/admin/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Admin> updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
        Admin updatedAdmin = adminServiceImple.update(id, admin);
        return ResponseEntity.ok(updatedAdmin);
    }

}
