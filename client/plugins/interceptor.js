export default ({ $axios }) => {
  $axios.interceptors.request.use(request => {
      request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return request
  })
}