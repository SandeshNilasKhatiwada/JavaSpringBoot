import React, { useEffect, useState } from "react";
import {
  createDepartment,
  getDepartment,
  updateDepartment,
} from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const Department = () => {
  const [departmentName, setName] = useState("");
  const [departmentDescription, setDescription] = useState("");

  const [errors, setErrors] = useState({
    departmentName: "",
    departmentDescription: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  async function saveOrUpdateDepartment(e) {
    e.preventDefault();
    let response = "";

    try {
      if (validateForm()) {
        const department = { departmentName, departmentDescription };
        if (id) {
          response = await updateDepartment(id, department);
          navigate("/departments");
        } else {
          response = await createDepartment(department);
          navigate("/departments");
        }
      }
    } catch (error) {
      console.log("Error:" + error);
    }
  }

  useEffect(() => {
    if (id) {
      getDepartment(id)
        .then((response) => {
          setName(response.data.departmentName);
          setDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (departmentName.trim()) {
      errorsCopy.departmentName = "";
    } else {
      errorsCopy.departmentName = "name is required";
      valid = false;
    }
    if (departmentDescription.trim()) {
      errorsCopy.departmentDescription = "";
    } else {
      errorsCopy.departmentDescription = "description is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
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
                  <label className="form-label">Name:</label>
                  <input
                    type="text"
                    placeholder="Enter Department Name"
                    name="departmentName"
                    value={departmentName}
                    className={`from-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Description:</label>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    name="departmentDescription"
                    value={departmentDescription}
                    className={`from-control ${
                      errors.departmentDescription ? "is-invalid" : ""
                    }`}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                  {errors.departmentDescription && (
                    <div className="invalid-feedback">
                      {errors.departmentDescription}
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateDepartment}
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

export default Department;
