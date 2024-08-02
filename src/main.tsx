import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import store from './store'
import { Auth0ProviderWithNavigate } from './utils/Auth0ProviderWithNavigate'

dayjs.extend(utc)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0ProviderWithNavigate>
        <RouterProvider router={router} />
      </Auth0ProviderWithNavigate>
    </Provider>
  </React.StrictMode>,
)
