import apiUrl from '../apiConfig'
import axios from 'axios'


export const getRequest = (token) => {
  return axios({
    url: apiUrl + '/api/requests',
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    }
  })
}

export const showRequestById = (token,id) => {
  return axios({
    url: `${apiUrl}/api/requests/${id}`,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    }
  })
}

export const createNewRequest = (token,request) => {
  return axios({
    url: apiUrl + '/api/requests',
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    },
    data: {
      request: request
    }
  })
}

export const updateRequestById = (token,id,request) => {
  return axios({
    url: `${apiUrl}/api/requests/${id}`,
    method: 'patch',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    },
    data: {
      request: request
    }
  })
}

export const deleteRequestById = (token,id) => {
  return axios({
    url: `${apiUrl}/api/requests/${id}`,
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    }
  })
}

