import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = { title, sets, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setError(null)
      setTitle('')
      setReps('')
      setSets('')
      setEmptyFields([])
      console.log('new workout added', json)
      dispatch({type:'CREATE_WORKOUT', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label htmlFor="title">Workout Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        name="title"
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label htmlFor="sets">Sets:</label>
      <input 
        type="number"
        onChange={(e) => setSets(e.target.value)}
        value={sets}
        name="sets"
        className={emptyFields.includes('sets') ? 'error' : ''}
      />

      <label htmlFor="reps">Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        name="reps"
        className={emptyFields.includes('reps') ? 'error' : ''}
      />  

      <button>Add Workout</button>
      {error && <div className="error">{error}</div> }
    </form>
  )
}

export default WorkoutForm