package com.springboot.springboot.controller;

import com.springboot.springboot.dto.DepartmentDto;
import com.springboot.springboot.entity.Department;
import com.springboot.springboot.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/departments")
@RestController
public class DepartmentController {
    private DepartmentService departmentService;

    @PostMapping("/")
    public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto departmentDto){
        DepartmentDto department = departmentService.createDepartment(departmentDto);

        return new ResponseEntity<>(department, HttpStatus.CREATED);

    }
    @GetMapping("{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable("id") Long departmentId ){
        DepartmentDto departmentDto = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(departmentDto);
    }
    @GetMapping("/")
    public ResponseEntity<List<DepartmentDto>> getAlldepartments(){
        List<DepartmentDto> departments = departmentService.getDepartment();
        return ResponseEntity.ok(departments);
    }

    @PutMapping("{id}")
    public ResponseEntity<DepartmentDto> updateDepartment(@PathVariable("id") Long departmentId, @RequestBody DepartmentDto departmentDto){
        DepartmentDto department = departmentService.updateDepartment(departmentId,departmentDto);
        return ResponseEntity.ok(department);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId){
        departmentService.deleteDepartment(departmentId);
        return  ResponseEntity.ok("Department Delete Sucussfully");
    }



}
