import React from 'react';
import ReactDOM from 'react-dom';
import './fonts.css';
import 'tailwindcss/tailwind.css';
import './custom.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
