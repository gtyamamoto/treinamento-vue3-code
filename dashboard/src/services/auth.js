export default httpClient => ({
  auth: async ({ email, password }) => {
    const response = httpClient.post('/auth/login', { email, password })
    let errors = null

    if (!response.data) {
      errors = {
        status: response.request.status,
        statusText: response.request.statusText
      }
    }
    return {
      data: response.data,
      errors
    }
  }
})
