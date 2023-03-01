import React from 'react';
import ReactDOM from 'react-dom/client';
const client = require("public/index");

const App = () => {
  return <div>
    Hello World
  </div>
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);