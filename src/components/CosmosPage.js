import React, { useState, useEffect } from 'react';
import CreateProposal from './CreateProposal';
import ApproveProposals from './ApproveProposals';
import ExecuteProposals from './ExecuteProposals';
import ExecutedProposals from './ExecutedProposals';

function CosmosPage({ context }) {
  const [selectedComponent, setSelectedComponent] = useState('approve-proposals');
  const [selectedChain, setSelectedChain] = useState('Archway');
  const [proposals, setProposals] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (context === 'cosmos') {
      setProposals([
        { id: 1, title: 'Cosmos Proposal 1', proposer: 'Alice', status: 'Pending', expiresAt: '2024-07-30' },
        { id: 2, title: 'Cosmos Proposal 2', proposer: 'Bob', status: 'Passed', expiresAt: '2024-08-15' },
        { id: 3, title: 'Cosmos Proposal 3', proposer: 'Charlie', status: 'Executed', expiresAt: '2024-06-20' },
        // Add more proposals as needed
      ]);
    } else if (context === 'evm') {
      setProposals([
        { id: 1, hash: '0xabc123', title: 'EVM Proposal 1', status: 'Pending' },
        { id: 2, hash: '0xdef456', title: 'EVM Proposal 2', status: 'Passed' },
        { id: 3, hash: '0xghi789', title: 'EVM Proposal 3', status: 'Executed' },
        // Add more proposals as needed
      ]);
    }
  }, [context]);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'create-proposal':
        return <CreateProposal context={context} />;
      case 'approve-proposals':
        return <ApproveProposals proposals={proposals.filter(p => p.status === 'Pending')} context={context} />;
      case 'execute-proposals':
        return <ExecuteProposals proposals={proposals.filter(p => p.status === 'Passed')} context={context} />;
      case 'executed-proposals':
        return <ExecutedProposals proposals={proposals.filter(p => p.status === 'Executed')} context={context} />;
      default:
        return <ApproveProposals proposals={proposals.filter(p => p.status === 'Pending')} context={context} />;
    }
  };

  const handleChainChange = (chain) => {
    setSelectedChain(chain);
    setDropdownOpen(false);
  };

  return (
    <div>
      <nav className="bg-white border-b-2 border-gray-800 shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4">
          <a href="/" className="font-bold text-lg text-gray-800">MultiChainGov</a>
          <div className="flex items-center">
            <div className="relative">
              <button
                className="text-gray-800"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Chain: {selectedChain}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <a
                    href="#"
                    onClick={() => handleChainChange('Archway')}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Archway
                  </a>
                  <a
                    href="#"
                    onClick={() => handleChainChange('Neutron')}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Neutron
                  </a>
                  <a
                    href="#"
                    onClick={() => handleChainChange('Injective')}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Injective
                  </a>
                </div>
              )}
            </div>
            <button className="ml-3 border border-gray-800 text-gray-800 px-3 py-2 rounded hover:bg-gray-800 hover:text-white">
              Wallet Address
            </button>
          </div>
        </div>
      </nav>
      <div className="flex">
        <div className="hidden md:block w-1/5 bg-gray-100 h-screen p-4 border-r border-gray-300">
          <nav className="flex flex-col space-y-4">
            <button
              className={`text-left py-2 px-4 rounded ${selectedComponent === 'create-proposal' ? 'bg-white bg-opacity-90 shadow' : 'hover:bg-gray-200'}`}
              onClick={() => setSelectedComponent('create-proposal')}
            >
              Create Proposal
            </button>
            <button
              className={`text-left py-2 px-4 rounded ${selectedComponent === 'approve-proposals' ? 'bg-white bg-opacity-90 shadow' : 'hover:bg-gray-200'}`}
              onClick={() => setSelectedComponent('approve-proposals')}
            >
              Approve Proposals
            </button>
            <button
              className={`text-left py-2 px-4 rounded ${selectedComponent === 'execute-proposals' ? 'bg-white bg-opacity-90 shadow' : 'hover:bg-gray-200'}`}
              onClick={() => setSelectedComponent('execute-proposals')}
            >
              Execute Proposals
            </button>
            {context === 'cosmos' && (
              <button
                className={`text-left py-2 px-4 rounded ${selectedComponent === 'executed-proposals' ? 'bg-white bg-opacity-75 shadow' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedComponent('executed-proposals')}
              >
                Executed Proposals
              </button>
            )}
          </nav>
        </div>
        <div className="w-full md:w-4/5 p-4">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default CosmosPage;
