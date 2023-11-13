package com.springboot.springboot.service.impl;

import com.springboot.springboot.dto.DepartmentDto;
import com.springboot.springboot.entity.Department;
import com.springboot.springboot.exceptions.ResourceNotFoundException;
import com.springboot.springboot.mapper.DepartmentMapper;
import com.springboot.springboot.repository.DepartmentRepository;
import com.springboot.springboot.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentRepository departmentRepository;

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {


        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        System.out.println("Department "+ department);
        Department savedDepartment = departmentRepository.save(department);

        return DepartmentMapper.mapTODepartmentDto(savedDepartment) ;
    }

    @Override
    public DepartmentDto getDepartmentById(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(
                ()->new ResourceNotFoundException("Department is not exist:" + departmentId));
        return DepartmentMapper.mapTODepartmentDto(department) ;
    }

    @Override
    public List<DepartmentDto> getDepartment() {
        List<Department> departments = departmentRepository.findAll();
        return departments.stream().map((department) -> DepartmentMapper.mapTODepartmentDto(department)).collect(Collectors.toList());
    }

    @Override
    public DepartmentDto updateDepartment(Long departmentId, DepartmentDto departmentDto) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(()->new ResourceNotFoundException("Department is not exists:"+ departmentId));
        department.setDepartmentName(departmentDto.getDepartmentName());
        department.setDepartmentDescription(departmentDto.getDepartmentDescription());
        Department savedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapTODepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentRepository.findById(departmentId).orElseThrow(()->new ResourceNotFoundException("Department is not exists:"+ departmentId));
        departmentRepository.deleteById(departmentId);
    }
}
