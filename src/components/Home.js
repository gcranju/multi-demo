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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-10 text-5xl" style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}>MultiChainGov</h1>
        <button 
          className="bg-white text-gray-800 font-bold border-2 border border-gray-800 rounded-full py-3 px-4 mb-5 shadow-md hover:shadow-lg transition-all"
          onClick={handleEvmClick}
        >
          Connect EVM Wallet
        </button>
        <br />
        <button 
          className="bg-white text-gray-800 font-bold border-2 border border-gray-800 rounded-full py-3 px-4 shadow-md hover:shadow-lg transition-all"
          onClick={handleCosmosClick}
        >
          Connect Cosmos Wallet
        </button>
      </div>
    </div>
  );
}

export default Home;
