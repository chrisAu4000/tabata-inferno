import Inferno from 'inferno'
import Component from 'inferno-component'
import {formToObj} from './utils'
import User from '../models/User'
import Validation, {Success, Failure} from 'data.validation'
import Task from 'data.task'
import {curry, sequence, flatten, compose} from 'ramda'

const flattenForm = compose(formToObj, flatten)

class SignUp extends Component {
  constructor(props) {
    super(props)
  }

  validate(e) {
    e.preventDefault()
    const nonEmpty = (prop, val) =>
      val.length > 0
      ? Success([{name: prop, value: val}])
      : Failure([{name: prop, value: 'Value must be not empty'}])
    const minLenght = () =>  {}
    const data = formToObj('.signup-form')
    const user = sequence(
      Validation.of,
      [
        nonEmpty('username', data['username']),
        nonEmpty('e-mail', data['e-mail']),
        nonEmpty('password', data['password']),
        nonEmpty('verification', data['verification'])
      ]
    )
    .bimap(flattenForm, flattenForm)
    
    console.log(user)
    console.log('ölkajsd')
  }
  render() {
    return (
      <div class="signup">
        <form method="POST" onSubmit={this.validate} class="signup-form">
          <label>Name</label>
          <input type="text" name="username"></input>
          <label>E-Mail</label>
          <input type="text" name="e-mail"></input>
          <label>Password</label>
          <input type="password" name="password"></input>
          <label>Verify</label>
          <input type="password" name="verification"></input>
          <input type="submit">SignUp</input>
        </form>
      </div>
    )
  }
}

export default SignUp
