package com.springboot.springboot.repository;

import com.springboot.springboot.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
