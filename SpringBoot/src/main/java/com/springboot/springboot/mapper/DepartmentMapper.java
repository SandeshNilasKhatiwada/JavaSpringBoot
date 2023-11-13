package com.springboot.springboot.mapper;

import com.springboot.springboot.dto.DepartmentDto;
import com.springboot.springboot.entity.Department;

public class DepartmentMapper {
    public static DepartmentDto mapTODepartmentDto(Department department){
        return new DepartmentDto(
                department.getId(),
                department.getDepartmentName(),
                department.getDepartmentDescription()
        );
    }
    public static Department mapToDepartment(DepartmentDto departmentDto){
        return new Department(
                departmentDto.getId(),
                departmentDto.getDepartmentName(),
                departmentDto.getDepartmentDescription()
        );
    }
}
