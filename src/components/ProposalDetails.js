import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { ethers } from 'ethers';

function ProposalDetails() {
  const { id, hash } = useParams();
  const [proposal, setProposal] = useState(null);
  const context = id ? 'cosmos' : 'evm';

  useEffect(() => {
    if (context === 'cosmos') {
      // Fetch the Cosmos proposal details based on the ID
      setProposal({
        id,
        title: `Cosmos Proposal ${id}`,
        proposer: 'Alice',
        status: 'Pending',
        expiresAt: '2024-07-30',
        messages: [
          {
            wasm: {
              execute: {
                contract_addr: 'archway1a0amxjdpfenhrxm3nr072q2rwnu3kcjsfvljptms3drwn5k7wuvqsm6qj5',
                msg: 'eyJ1cGRhdGVfbWVtYmVycyI6eyJyZW1vdmUiOltdLCJhZGQiOlt7ImFkZHIiOiJhcmNod2F5MXZram50MHA3MDY0eTZ6bXh4bmx1N3RmdGoyc2o1MDllMGp3eDdxIiwid2VpZ2h0IjoxfV19fQ==',
                funds: [],
              },
            },
          },
        ],
      });
    } else if (context === 'evm') {
      // Fetch the EVM proposal details based on the hash
      setProposal({
        hash,
        title: `EVM Proposal ${hash}`,
        status: 'Pending',
        messages: [
          {
            data: '0x1234567890abcdef',
            // ABI for decoding the data
            abi: [
                "function upgradeAndCall(address proxy, address implementation, bytes data)"
            ],
          },
        ],
      });
    }
  }, [context, id, hash]);

  const decodeMessage = (msg) => {
    return JSON.stringify(JSON.parse(Base64.decode(msg)), null, 2);
  };

  const decodeAbiMessage = (data, abi) => {
    try {
      const iface = new ethers.Interface(abi);
      const decodedData = iface.parseTransaction({ data });
      return JSON.stringify(decodedData, null, 2);
    } catch (error) {
      return 'Error decoding ABI data';
    }
  };

  const handleApprove = () => {
    console.log(`Approved proposal ${context === 'cosmos' ? proposal.id : proposal.hash}`);
  };

  const handleExecute = () => {
    console.log(`Executed proposal ${context === 'cosmos' ? proposal.id : proposal.hash}`);
  };

  if (!proposal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Proposal Details</h1>
        <div className="mb-4">
          <p><strong>Proposal ID:</strong> {context === 'cosmos' ? proposal.id : proposal.hash}</p>
          <p><strong>Title:</strong> {proposal.title}</p>
          {context === 'cosmos' && <p><strong>Proposer:</strong> {proposal.proposer}</p>}
          <p><strong>Status:</strong> {proposal.status}</p>
          {context === 'cosmos' && <p><strong>Expires At:</strong> {proposal.expiresAt}</p>}
        </div>
        <hr className="my-4" />
        <h5 className="text-xl font-semibold mb-2">Messages:</h5>
        {proposal.messages.map((message, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-inner">
            {context === 'cosmos' ? (
              <>
                <p><strong>Contract Address:</strong> {message.wasm.execute.contract_addr}</p>
                <p><strong>Message:</strong></p>
                <pre className="bg-gray-200 p-2 rounded">{decodeMessage(message.wasm.execute.msg)}</pre>
              </>
            ) : (
              <>
                <p><strong>Data:</strong></p>
                <pre className="bg-gray-200 p-2 rounded">{decodeAbiMessage(message.data, message.abi)}</pre>
              </>
            )}
          </div>
        ))}
        {proposal.status === 'Pending' && (
          <button
            onClick={handleApprove}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 float-right ml-2"
          >
            Approve
          </button>
        )}
        {proposal.status === 'Passed' && (
          <button
            onClick={handleExecute}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 float-right ml-2"
          >
            Execute
          </button>
        )}
      </div>
    </div>
  );
}

export default ProposalDetails;
