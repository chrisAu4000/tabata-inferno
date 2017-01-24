import Inferno from 'inferno'
import Component from 'inferno-component'

require('./clock.css')

class Clock extends Component {
  constructor(props) {
    super(props)
  }



  toTwoDiggits(val) {
    return ('0' + val).slice(-2)
  }

  getSeconds(sec) {
    return this.toTwoDiggits(Math.floor(Math.abs(sec)) % 60)
  }

  getHours(sec) {
    if (sec < 0) return '-00'
    return this.toTwoDiggits(Math.floor(sec / 60) % 60)
  }

  clockFormat(centiSec) {
    return this.getHours(centiSec) + ':' + this.getSeconds(centiSec)
  }

  render() {
    return (
      <div>
        <div class="center">
          <div class="clock">
            <div class="timer-clock">
              <span>{ this.clockFormat(this.props.seconds) }</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Clock
