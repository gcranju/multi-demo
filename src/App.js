import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CosmosPage from './components/CosmosPage';
import ProposalDetails from './components/ProposalDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cosmos" element={<CosmosPage context="cosmos" />} />
        <Route path="/evm" element={<CosmosPage context="evm" />} />
        <Route path="/cosmos/proposal/:id" element={<ProposalDetails />} />
        <Route path="/evm/proposal/:hash" element={<ProposalDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
