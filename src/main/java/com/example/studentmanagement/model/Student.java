package com.example.studentmanagement.model;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Objects;

@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String nic;
    private String name;
    @Column(unique = true)
    private String email;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return getId() == student.getId() && Objects.equals(getNic(), student.getNic()) && Objects.equals(getUserName(), student.getUserName()) && Objects.equals(getPassword(), student.getPassword());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getPassword());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    @Transient // This annotation tells JPA to ignore this field when persisting to the database
    private transient BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void setPassword(String password) {
        // Hash the password before setting it
        this.password = passwordEncoder.encode(password);
    }

    private String image;
    private String address;
    @Column(unique = true)
    private String mobile;
    @Column(unique = true)
    private String userName;
    private String password;
}
