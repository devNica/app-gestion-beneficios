import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { QueryClientProvider, QueryClient } from 'react-query'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import './index.css'

const queryClient = new QueryClient()

const persistore = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <PersistGate persistor={persistore}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
