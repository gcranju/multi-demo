import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
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
    <div className="container mt-5">
      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <Card.Title>Proposal Details</Card.Title>
          <Card.Text><strong>Proposal ID:</strong> {context === 'cosmos' ? proposal.id : proposal.hash}</Card.Text>
          <Card.Text><strong>Title:</strong> {proposal.title}</Card.Text>
          {context === 'cosmos' && <Card.Text><strong>Proposer:</strong> {proposal.proposer}</Card.Text>}
          <Card.Text><strong>Status:</strong> {proposal.status}</Card.Text>
          {context === 'cosmos' && <Card.Text><strong>Expires At:</strong> {proposal.expiresAt}</Card.Text>}
          <hr />
          <h5>Messages:</h5>
          {proposal.messages.map((message, index) => (
            <Card className="mb-3" key={index}>
              <Card.Body>
                {context === 'cosmos' ? (
                  <>
                    <Card.Text><strong>Contract Address:</strong> {message.wasm.execute.contract_addr}</Card.Text>
                    <Card.Text><strong>Message:</strong></Card.Text>
                    <pre>{decodeMessage(message.wasm.execute.msg)}</pre>
                  </>
                ) : (
                  <>
                    <Card.Text><strong>Data:</strong></Card.Text>
                    <pre>{decodeAbiMessage(message.data, message.abi)}</pre>
                  </>
                )}
              </Card.Body>
            </Card>
          ))}
          {proposal.status === 'Pending' && (
            <Button variant="success" onClick={handleApprove} className="float-right">
              Approve
            </Button>
          )}
          {proposal.status === 'Passed' && (
            <Button variant="primary" onClick={handleExecute} className="float-right">
              Execute
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProposalDetails;
