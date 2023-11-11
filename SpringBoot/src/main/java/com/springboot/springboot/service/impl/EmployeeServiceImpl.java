package com.springboot.springboot.service.impl;

import com.springboot.springboot.dto.EmployeeDto;
import com.springboot.springboot.entity.Employee;
import com.springboot.springboot.exceptions.ResourceNotFoundException;
import com.springboot.springboot.mapper.EmployeeMapper;
import com.springboot.springboot.repository.EmployeeRepository;
import com.springboot.springboot.service.EmployeeService;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor

public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeByID(Long employeeId) {
        Employee employee =
                employeeRepository.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee doesn't exist:"+employeeId));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map((emp)-> EmployeeMapper.mapToEmployeeDto(emp))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("Employee is doesnt exist: "+employeeId));
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new ResourceNotFoundException("Employee is doesnt exist: "+employeeId));
        employeeRepository.deleteById(employeeId);
    }
}
