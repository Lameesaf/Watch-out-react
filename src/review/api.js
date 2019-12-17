import apiUrl from '../apiConfig'
import axios from 'axios'


export const getReview = (token) => {
  return axios({
    url: apiUrl + '/api/reviews',
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    }
  })
}

export const showReviewById = (token,id) => {
  return axios({
    url: `${apiUrl}/api/reviews/${id}`,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    }
  })
}

export const createNewReview = (token,request_id) => {
  return axios({
    url: `${apiUrl}/api/requests/${request_id}/review`,
    method: 'post', 
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    },
    data: {
      review: {
        title : 'Dibs',
        content: 'Wait for review'
      }
    }
  })
}

export const updateReviewById = (token,id,review) => {
  return axios({
    url: `${apiUrl}/api/reviews/${id}`,
    method: 'patch',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    },
    data: {
      review: review
    }
  })
}

export const deleteReviewById = (token,id) => {
  return axios({
    url: `${apiUrl}/api/reviews/${id}`,
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}` // FOR EXPRESS
    }
  })
}

