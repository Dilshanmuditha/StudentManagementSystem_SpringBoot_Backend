package com.example.studentmanagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String code;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getLecturer_id() {
        return lecturer_id;
    }

    public void setLecturer_id(Long lecturer_id) {
        this.lecturer_id = lecturer_id;
    }

    private String name;
    private Long lecturer_id;
}
