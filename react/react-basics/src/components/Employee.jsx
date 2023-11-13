import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { listDepartment } from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartment] = useState([]);

  useEffect(() => {
    listDepartment()
      .then((response) => {
        setDepartment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  async function saveOrUpdateEmployee(e) {
    e.preventDefault();
    let response = "";

    try {
      if (validateForm()) {
        const employee = { firstName, lastName, email, departmentId };
        console.log(employee);
        if (id) {
          response = await updateEmployee(id, employee);
          navigate("/");
        } else {
          response = await createEmployee(employee);
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Error:" + error);
    }
  }

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "first name is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "last name is required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "email is required";
      valid = false;
    }
    if (departmentId) {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Select department";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {pageTitle()}
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Employee First Name"
                    name="firstName"
                    value={firstName}
                    className={`from-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Employee Last Name"
                    name="lastName"
                    value={lastName}
                    className={`from-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Email:</label>
                  <input
                    type="text"
                    placeholder="Enter Employee Email"
                    name="email"
                    value={email}
                    className={`from-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> Select Department:</label>
                  <select
                    className={`from-control ${
                      errors.department ? "is-invalid " : ""
                    }`}
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                  >
                    <option value="Select Department">Select Department</option>
                    {departments.map((department) => (
                      <option
                        key={department.id}
                        value={department.id}
                        onChange={(e) => {
                          console.log();
                          // setDepartmentId(e.target.value);
                          console.log(departmentId);
                        }}
                      >
                        {department.departmentName}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <div className="invalid-feedback">{errors.department}</div>
                  )}
                </div>
                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Employee;
