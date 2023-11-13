import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
function ListEmployee() {
  const [employees, setEmployee] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    listAllEmployee();
  }, []);

  async function listAllEmployee() {
    try {
      let response = await listEmployees();
      setEmployee(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function addNewEmployee() {
    navigator("/add-employee");
  }

  async function removeEmployee(id) {
    await deleteEmployee(id);
    listAllEmployee();
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }
  return (
    <div className="container">
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <h2 className="text-center">List of Employees</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger "
                  onClick={() => removeEmployee(employee.id)}
                  style={{ margin: 5 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployee;
