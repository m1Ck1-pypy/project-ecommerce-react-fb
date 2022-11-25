import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';

import App from './App';
import { initialState } from './context/initialState';
import reduser from './context/reduser';
import { StateProvider } from './context/StateProvider';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider initialState={initialState} reducer={reduser}>
        <App />
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
)
