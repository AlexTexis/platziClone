import React from 'react'
import App from './routes'
import { render } from 'react-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import { getCookie } from './utils/getCookieValue'

import './styles/app.scss'

render(
  <Provider store={store()}>
    <App isLogged={(getCookie('token'))}/>
  </Provider>,
  document.getElementById('root')
)

// Webpack Hot Module Replacement API
// if (module.hot) module.hot.accept('./routes', () => render(App));