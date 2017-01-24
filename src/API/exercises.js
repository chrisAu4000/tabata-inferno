const API = 'http://localhost:3001/v1/'
function getExercises(fetch) {
  return fetch(`${API}exercise`)
    .then(verifyResponse, handleError)
}

function verifyResponse(res) {

  const contentType = res.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json' !== -1)) {
    const json = res.json()
    return json
  } else {
    handleError({ name: 'TypeError', message: 'Response was not a JSON' })
  }
}

function handleError(error) {
  console.error(`${error.name}: ${error.message}`)
  throw error
}

const Service = {getExercises}
export default Service
