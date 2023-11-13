import React, { useEffect, useState } from "react";
import {
  listDepartment,
  deleteDepartment,
} from "../services/DepartmentService";
import { useNavigate } from "react-router-dom";
function ListDepartment() {
  const [departments, setDepartment] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    listAllDepartment();
  }, []);

  async function listAllDepartment() {
    try {
      let response = await listDepartment();
      setDepartment(response.data);
      console.log(departments);
    } catch (error) {
      console.log(error);
    }
  }

  function addNewDepartment() {
    navigator("/add-Department");
  }

  async function removeDepartment(id) {
    await deleteDepartment(id);
    listAllDepartment();
  }

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`);
  }
  return (
    <div className="container">
      <button className="btn btn-primary mb-2" onClick={addNewDepartment}>
        Add Department
      </button>
      <h2 className="text-center">List of Departments</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Department Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateDepartment(department.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger "
                  onClick={() => removeDepartment(department.id)}
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

export default ListDepartment;
