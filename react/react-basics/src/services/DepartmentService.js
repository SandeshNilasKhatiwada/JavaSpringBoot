import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8000/api/departments/";

export const listDepartment = async () => {
  let url = REST_API_BASE_URL;
  return await axios.get(url);
};

export const createDepartment = async (department) => {
  return await axios.post(REST_API_BASE_URL, department);
};

export const getDepartment = async (departmentId) =>
  await axios.get(REST_API_BASE_URL + departmentId);

export const updateDepartment = async (departmentId, department) => {
  await axios.put(REST_API_BASE_URL + departmentId, department);
};
export const deleteDepartment = async (departmentId) => {
  const response = await axios.delete(REST_API_BASE_URL + departmentId);
  console.log(response);
};
