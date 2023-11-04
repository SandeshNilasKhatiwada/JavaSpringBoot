package com.springboot.springboot.controller;


import com.springboot.springboot.bean.Student;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @GetMapping("")
    //http://locahost:8000/student
    public ResponseEntity<Student> getStudent(){
        Student student = new Student(1,"Sandesh","Khatiwada");
        return ResponseEntity.ok().body(student);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Student>> getStudents(){
        List<Student> students = new ArrayList<>();
        students.add(new Student(1,"Sandesh","Nilas"));
        students.add(new Student(2,"Robin","Giri"));
        students.add(new Student(3,"Abishek","Shrestha"));
        return ResponseEntity.ok().body(students);
    }

    //Spring BOOT REST API With Path Variable
    @GetMapping("/{id}/{first-name}/{last-name}")
    public ResponseEntity<Student> studentPathVariable(@PathVariable("id") int studentId,@PathVariable("first-name") String firstName,@PathVariable("last-name") String lastName ){

        return ResponseEntity.ok().body(new Student(studentId,firstName,lastName));
    }

    //spring boot REST AI with request params
    @GetMapping("/query")
    public ResponseEntity<Student> studentRequestVariable(@RequestParam int id){
        return ResponseEntity.ok().body(new Student(id,"Sandesh","Nilas"));
    }
    //@PostMapping and @RequestBody
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Student> createStudent(@RequestBody Student student){
        System.out.println(student.getId());
        System.out.println(student.getFirstName());
        System.out.println(student.getLastName());
        return ResponseEntity.ok().body(student);
    }
    @PutMapping("/{id}/update")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student,@PathVariable("id") int studentId){

        System.out.println(student.getFirstName());
        System.out.println(student.getLastName());
        return ResponseEntity.ok().body(student);
    }
    //delete request
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") int studentId){
        return ResponseEntity.ok().body("Student deleted Successfully");
    }

}
