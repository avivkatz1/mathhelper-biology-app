import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './store/store';
import { BioLogin, Shell, CreatureCreation, ViewCreature } from './pages';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/biology" replace />} />
          <Route path="/biology" element={<BioLogin />} />
          <Route path="/biology/evolutionSimulator" element={<Shell />}>
            <Route path="creaturecreation" element={<CreatureCreation />} />
            <Route path="viewcreature" element={<ViewCreature />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
