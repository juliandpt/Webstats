export default function ({ $axios, app }, inject) {
  $axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}