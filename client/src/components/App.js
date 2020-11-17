import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from '.';

const App = () => {
  return (
    <Router>
      <Route render={() => <Layout />} />
    </Router>
  );
};

export default App;
