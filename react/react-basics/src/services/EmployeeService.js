import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8000/api/employees/";

export const listEmployees = async () => {
  let url = REST_API_BASE_URL + "all";
  return await axios.get(url);
};

export const createEmployee = async (employee) => {
  return await axios.post(REST_API_BASE_URL + "addEmployee", employee);
};

export const getEmployee = async (employeeId) =>
  await axios.get(REST_API_BASE_URL + employeeId);

export const updateEmployee = async (employeeId, employee) => {
  await axios.put(REST_API_BASE_URL + employeeId, employee);
};
export const deleteEmployee = async (employeeId) => {
  const response = await axios.delete(REST_API_BASE_URL + employeeId);
  console.log(response);
};
