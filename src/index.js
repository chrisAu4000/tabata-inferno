import Inferno from 'inferno'
// import Router2 from './components/Router'
// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
const browserHistory = createBrowserHistory()
// app components
import App from './app'
import Timer from './components/Timer'
import SignUp from './components/Signup'
// main styles
import './main.css'

if (module.hot) {
  require('inferno-devtools');
}

const routes = (
	<Router history={ browserHistory }>
		<Route component={ App }>
			<Route path="/" component={ Timer } />
      <Route path="/signup" component={ SignUp } />
		</Route>
	</Router>
)

Inferno.render(routes, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}
