import Inferno from 'inferno'
import Component from 'inferno-component'
require('./exerciseList.css')

class ExerciseList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      exercises: this.addTimes(props.exercises),
      currentExercise: {type: 'pause', start: -3, stop: 0}
    }
    this.setCurrentExercise = this.setCurrentExercise.bind(this)
  }

  addTimes(exercises) {
    const getStartTime = (acc) => {
      const last = acc.slice(-1)[0]
      return last ? (last.stop + last.pause) : 0
    }
    const getStopTime = (acc, curr) => {
      const start = getStartTime(acc)
      return start + curr.time
    }
    return exercises
      .reduce((acc, curr, index) => acc.concat([
        {...curr, id: index, start: getStartTime(acc), stop: getStopTime(acc, curr)}
      ]), [])
  }

  setCurrentExercise(seconds) {
    if (seconds < 0) return this.state.currentExercise
    const exercise = this.state.exercises
      .filter(curr => curr.start <= seconds &&
                      curr.stop + curr.pause >= seconds)[0]
    this.setState({
      ...this.state,
      currentExercise: exercise.stop >= seconds ? exercise : {
        type: 'pause',
        start: exercise.stop,
        stop: exercise.stop + exercise.pause
      }
    })
  }

  getTimeLeft(currentExercise, seconds) {
    return currentExercise.stop - seconds
  }

  renderExercise({name, type, img}) {
    return (
      <div class="exercise-list-item">
        <div class="exercise-list-item-type">{ name }</div>
        <div class="img-wrapper">
          <img class="exercise-list-item-img" src={ img }/>
        </div>
        <div class="exercise-list-item-name">{ type.toUpperCase() }</div>
      </div>
    )
  }

  render(props, state) {
    this.setCurrentExercise(props.seconds)
    return (
      <div>
      <div class="container">
        <div class="overlay">{
          state.currentExercise.type === 'pause'
          ? this.getTimeLeft(state.currentExercise, props.seconds)
          : ''
          }
        </div>
        <div class="slider" style={{
          opacity: state.currentExercise.type === 'pause' ? 0.5 : 1
        }}>
          <div class="list" style={{
            left: 33 - (33 * (state.currentExercise.id)) + '%'
          }}>
            { state.exercises.map(e => this.renderExercise(e)) }
          </div>
        </div>
      </div>
      <div class="time-left">{
        state.currentExercise.type !== 'pause'
        ? this.getTimeLeft(state.currentExercise, props.seconds) + ' seconds left'
        : ''
        }
      </div>
      </div>
    )
  }
}

export default ExerciseList
