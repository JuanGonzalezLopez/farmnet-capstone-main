import axios from 'axios';

const prod = 'https://thermo.software/service/';
const dev = 'http://localhost:9000/';

export function getCows(){
  return axios.post(`${prod}cows/getCows`)
}
export function getTemperatures(data){
  return axios.post(`${prod}temperature/getTemperatures`, data)
}
export function getAllTemp(data){
  return axios.post(`${prod}temperature/getAllTemp`, data)
}
export function getSteps(data){
  return axios.post(`${prod}steps/getSteps`, data)
}
export function addCow(data){
  return axios.post(`${prod}cows/addCow`, data)
}
export function editCow(data){
  return axios.post(`${prod}cows/updateCow`, data)
}
export function deleteCow(data){
  return axios.post(`${prod}cows/deleteCow`, data)
}
export function deleteSteps(data){
  return axios.post(`${prod}steps/deleteSteps`, data)
}
export function deleteTemp(data){
  return axios.post(`${prod}temperature/deleteTemperatures`, data)
}
