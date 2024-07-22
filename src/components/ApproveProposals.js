import React from 'react';
import { Link } from 'react-router-dom';

function ApproveProposals({ proposals, context }) {
  const handleApprove = (id) => {
    console.log(`Approved proposal ${id}`);
  };

  return (
    <div className="container mx-auto mt-12">
      <h1 className="text-2xl font-bold mb-6">Approve Proposals</h1>
      <div className="overflow-x-auto shadow-sm rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-600 text-white">
            <tr>
              {context === 'evm' ? (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Proposal Hash</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
                </>
              ) : (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Proposal ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Proposer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Expires At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Details</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {proposals.map((proposal, index) => (
              <tr key={proposal.id} className={`even:bg-gray-50 hover:bg-gray-100`}>
                {context === 'evm' ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">{proposal.hash}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{proposal.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{proposal.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        onClick={() => handleApprove(proposal.id)}
                      >
                        Approve
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/${context}/proposal/${proposal.hash}`}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                      >
                        Details
                      </Link>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">{proposal.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{proposal.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{proposal.proposer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{proposal.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{proposal.expiresAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        onClick={() => handleApprove(proposal.id)}
                      >
                        Approve
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/${context}/proposal/${proposal.id}`}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                      >
                        Details
                      </Link>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApproveProposals;
