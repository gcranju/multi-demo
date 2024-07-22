import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleCosmosClick = () => {
    navigate('/cosmos');
  };

  const handleEvmClick = () => {
    navigate('/evm');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="mb-5" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>MultiChainGov</h1>
        <button className="btn btn-primary btn-lg mb-3" style={buttonStyle} onClick={handleEvmClick}>Connect EVM Wallet</button>
        <br />
        <button className="btn btn-secondary btn-lg" style={buttonStyle} onClick={handleCosmosClick}>Connect Cosmos Wallet</button>
      </div>
    </div>
  );
}

const buttonStyle = {
  backgroundColor: 'white',
  color: '#333',
  fontWeight: 'bold',
  border: '2px solid #333',
  borderRadius: '12px',
  padding: '10px 20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export default Home;
