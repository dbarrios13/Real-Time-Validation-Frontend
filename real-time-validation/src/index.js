import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import logger from 'redux-logger'
import rootReducer from './store/reducer'
import App from './App'
import './styles/index.sass'
import * as serviceWorker from './serviceWorker'

const devTool = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose

const store = createStore(
    rootReducer,
    devTool(applyMiddleware(thunk, logger))
)

const AppRouter = withRouter(App)

ReactDOM.render(
    <Provider store={store} >
        <Router>
            <AppRouter />
        </Router>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()