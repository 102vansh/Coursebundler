import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { ChakraProvider,theme } from '@chakra-ui/react';
import {store, persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor} >
  <ChakraProvider theme={theme}>
    <ColorModeScript />
                                                                
    <App />
    </ChakraProvider>
    </PersistGate>
  </Provider>
    

  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
