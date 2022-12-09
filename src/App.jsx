import React from 'react'
import Router from './router'
import { Provider } from "react-redux";
import { store, persistor } from './services'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react';

const App = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Router />
      </Provider>
    </PersistGate>
  )
}

export default App