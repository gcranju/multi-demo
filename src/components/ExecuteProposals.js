import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ExecuteProposals({ proposals, context }) {
  const handleExecute = (id) => {
    console.log(`Executed proposal ${id}`);
  };

  return (
    <div className="container mt-5">
      <h1>Execute Proposals</h1>
      <Table striped bordered hover responsive className="shadow-sm mt-4">
        <thead className="table-primary">
          <tr>
            {context === 'evm' ? (
              <>
                <th>Proposal Hash</th>
                <th>Title</th>
                <th>Status</th>
                <th>Action</th>
                <th>Details</th>
              </>
            ) : (
              <>
                <th>Proposal ID</th>
                <th>Title</th>
                <th>Proposer</th>
                <th>Status</th>
                <th>Expires At</th>
                <th>Action</th>
                <th>Details</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              {context === 'evm' ? (
                <>
                  <td>{proposal.hash}</td>
                  <td>{proposal.title}</td>
                  <td>{proposal.status}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleExecute(proposal.id)}>
                      Execute
                    </Button>
                  </td>
                  <td>
                    <Link to={`/${context}/proposal/${proposal.hash}`} className="btn btn-info">
                      Details
                    </Link>
                  </td>
                </>
              ) : (
                <>
                  <td>{proposal.id}</td>
                  <td>{proposal.title}</td>
                  <td>{proposal.proposer}</td>
                  <td>{proposal.status}</td>
                  <td>{proposal.expiresAt}</td>
                  <td>
                    <Button variant="primary" onClick={() => handleExecute(proposal.id)}>
                      Execute
                    </Button>
                  </td>
                  <td>
                    <Link to={`/${context}/proposal/${proposal.id}`} className="btn btn-info">
                      Details
                    </Link>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ExecuteProposals;
