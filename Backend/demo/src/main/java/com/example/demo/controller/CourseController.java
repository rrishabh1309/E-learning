package com.example.demo.controller;

import com.example.demo.model.Course;
import com.example.demo.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseRepository courseRepo;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseRepo.save(course);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable String id) {
        courseRepo.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
