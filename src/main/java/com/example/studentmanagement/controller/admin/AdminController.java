package com.example.studentmanagement.controller.admin;

import com.example.studentmanagement.errorHandling.UniqueError;
import com.example.studentmanagement.model.Admin;
import com.example.studentmanagement.security.AuthRequest;
import com.example.studentmanagement.service.AdminService;
import com.example.studentmanagement.service.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class AdminController {

    @Autowired
    AdminServiceImpl adminServiceImpl;
    @Autowired
    AdminService adminService;

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    String helloWorld(){
        return "My First Sprint Boot api";
    }

    @RequestMapping(value = "/admins", method = RequestMethod.GET)
    public List<Admin> getAdmins(){
        return adminServiceImpl.getAdmins();
    }
    @RequestMapping(value = "/admin", method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Admin admin){
        try {
            Admin savedAdmin = adminServiceImpl.save(admin);
            return ResponseEntity.ok(savedAdmin);
        } catch (DataIntegrityViolationException ex) {
            String errorMessage = UniqueError.extractErrorMessage(ex);
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }

    @RequestMapping(value = "/admin/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Admin> updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
        Admin updatedAdmin = adminServiceImpl.update(id, admin);
        return ResponseEntity.ok(updatedAdmin);
    }

    @RequestMapping(value = "/admin/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> viewAdmin(@PathVariable Integer id) {
        try {
            Optional<Admin> viewAdmin = adminServiceImpl.view(id);
            if (viewAdmin.isPresent()) {
                return ResponseEntity.ok(viewAdmin.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found with ID: " + id);
            }
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }
}
