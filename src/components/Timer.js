import Inferno from 'inferno'
import Component from 'inferno-component'
import Navigation from './Navigation/loggedIn'
import Clock from './Clock'
import ExerciseList from './ExerciseList'
import API from '../API/exercises'

const burpees = require('./../../public/img/burpees.png')
const jumpingJacks = require('./../../public/img/jumpingJacks.png')
const boxJumps = require('./../../public/img/boxJumps.png')
const pushups = require('./../../public/img/pushup.png')
const hillClimb = require('./../../public/img/hillclimbs.png')
const exercises = [
  {name: 'Jumping Jacks', img: jumpingJacks, time: 5*60, type: 'warmup', pause: 10},
  {name: 'Burpees', img: burpees, time: 20, type: 'exercise', pause: 10},
  {name: 'Box-Jump', img: boxJumps, time: 20, type: 'exercise', pause: 10},
  {name: 'Push-Ups', img: pushups, time: 20, type: 'exercise', pause: 10},
  {name: 'Hill-Climb', img: hillClimb, time: 20, type: 'exercise', pause: 10},
  {name: 'Burpees', img: burpees, time: 20, type: 'exercise', pause: 10},
  {name: 'Box-Jump', img: boxJumps, time: 20, type: 'exercise', pause: 10},
  {name: 'Push-Ups', img: pushups, time: 20, type: 'exercise', pause: 10},
  {name: 'Hill-Climb', img: hillClimb, time: 20, type: 'exercise', pause: 10},
  {name: 'Jumping Jacks', img: jumpingJacks, time: 5*60, type: 'cooldown', pause: 0}
]

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationItems: [{text: 'Sing Up', path:'/signup'}],
      seconds: props.pre * (-1) || -3,
      buttonText: 'Start',
      exercises: exercises
    }
    this.absTime = (props.pre || 3) + this.addTimes(exercises)
    this.increment = this.increment.bind(this)
    this.toggle = this.toggle.bind(this)
    this.setButtonText = this.setButtonText.bind(this)
  }
  componentDidMount() {
    API.getExercises(fetch)
      .then(res => this.setState(...this.state, {exercises: res}))
      .catch(console.error)
  }
  addTimes(list) {
    return list.reduce((acc, curr) => acc + curr.time + curr.pause, 0)
  }

  increment() {
    if (this.absTime <= this.state.seconds) {
      this.toggle()
    }
    this.setState({
      ...this.state,
      seconds: this.state.seconds + 1
    })
  }

  setButtonText(text) {
    this.setState({
      ...this.state,
      buttonText: text
    })
  }

  toggle(e) {
    if (!this.interval) {
      this.interval = setInterval(this.increment, 100)
      this.setButtonText('Stop')
    } else {
      clearInterval(this.interval)
      this.interval = undefined
      this.setButtonText('Start')
    }
  }

  render(props, state) {
    return (
      <div class="timer">
        <Navigation navigationItems={state.navigationItems}/>
        <button onClick={ this.toggle } class="timer-button">
          { state.buttonText }
        </button>
        <Clock pre="3" exercises={ exercises } seconds={ state.seconds }/>
        <ExerciseList
          exercises={ state.exercises }
          seconds={ state.seconds }
        />
      </div>
    )
  }
}

export default Timer
