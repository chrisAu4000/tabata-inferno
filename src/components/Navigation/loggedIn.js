import Inferno from 'inferno'
import {Link} from 'inferno-router'
// import NavigationItem from './NavigationItem'
const NavigationItem = ({text, path}) => {
  return (
    <li><Link to={path}>{text}</Link></li>
  )
}
const Navigation = (props, state) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        { props.navigationItems.map(NavigationItem)}
      </ul>
    </nav>
  )
}
export default Navigation
