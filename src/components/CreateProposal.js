import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, ListGroup, InputGroup } from 'react-bootstrap';

function CreateProposal({ context }) {
  const [proposalType, setProposalType] = useState('member-management');
  const [memberAddress, setMemberAddress] = useState('');
  const [action, setAction] = useState('add');
  const [newThreshold, setNewThreshold] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [proxyAdminAddress, setProxyAdminAddress] = useState('');
  const [implementationAddress, setImplementationAddress] = useState('');
  const [newCodeId, setNewCodeId] = useState('');
  const [membersToAdd, setMembersToAdd] = useState('');
  const [membersToRemove, setMembersToRemove] = useState('');
  const [membersToAddList, setMembersToAddList] = useState([]);
  const [membersToRemoveList, setMembersToRemoveList] = useState([]);

  const handleAddMember = () => {
    if (membersToAdd.trim() !== '') {
      setMembersToAddList([...membersToAddList, membersToAdd.trim()]);
      setMembersToAdd('');
    }
  };

  const handleRemoveMember = () => {
    if (membersToRemove.trim() !== '') {
      setMembersToRemoveList([...membersToRemoveList, membersToRemove.trim()]);
      setMembersToRemove('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log({
      proposalType,
      memberAddress,
      action,
      newThreshold,
      contractAddress,
      proxyAdminAddress,
      implementationAddress,
      newCodeId,
      membersToAddList,
      membersToRemoveList,
    });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card className="shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '80%', height: '80%' }}>
        <Card.Body>
          <Card.Title>Create Proposal</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="proposalType" className="mb-4">
              <Form.Label>Proposal Type</Form.Label>
              <Form.Control
                as="select"
                value={proposalType}
                onChange={(e) => setProposalType(e.target.value)}
                className="custom-select"
              >
                <option value="member-management">Member Management Proposal</option>
                <option value="contract-upgrade">Contract Upgrade</option>
              </Form.Control>
            </Form.Group>
            <hr />
            {proposalType === 'member-management' && (
              <>
                {context === 'evm' ? (
                  <>
                    <Form.Group controlId="memberAddress" className="mb-3">
                      <Form.Label>Member Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter member address"
                        value={memberAddress}
                        onChange={(e) => setMemberAddress(e.target.value)}
                        className="custom-input"
                      />
                    </Form.Group>
                    <Form.Group controlId="action" className="mb-3">
                      <Form.Label>Action</Form.Label>
                      <Form.Control
                        as="select"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        className="custom-select"
                      >
                        <option value="add">Add Member</option>
                        <option value="remove">Remove Member</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="newThreshold" className="mb-3">
                      <Form.Label>New Threshold</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter new threshold"
                        value={newThreshold}
                        onChange={(e) => setNewThreshold(e.target.value)}
                        className="custom-input"
                      />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Form.Group controlId="membersToAdd" className="mb-3">
                      <Form.Label>Members to Add</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter member address"
                          value={membersToAdd}
                          onChange={(e) => setMembersToAdd(e.target.value)}
                          className="custom-input"
                        />
                        <Button variant="outline-secondary" onClick={handleAddMember}>+</Button>
                      </InputGroup>
                      <ListGroup className="mt-2">
                        {membersToAddList.map((member, index) => (
                          <ListGroup.Item key={index}>{member}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Form.Group>
                    <Form.Group controlId="membersToRemove" className="mb-3">
                      <Form.Label>Members to Remove</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Enter member address"
                          value={membersToRemove}
                          onChange={(e) => setMembersToRemove(e.target.value)}
                          className="custom-input"
                        />
                        <Button variant="outline-secondary" onClick={handleRemoveMember}>+</Button>
                      </InputGroup>
                      <ListGroup className="mt-2">
                        {membersToRemoveList.map((member, index) => (
                          <ListGroup.Item key={index}>{member}</ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Form.Group>
                    <Form.Group controlId="newThreshold" className="mb-3">
                      <Form.Label>New Threshold</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter new threshold"
                        value={newThreshold}
                        onChange={(e) => setNewThreshold(e.target.value)}
                        className="custom-input"
                      />
                    </Form.Group>
                  </>
                )}
              </>
            )}
            {proposalType === 'contract-upgrade' && (
              <>
                <Form.Group controlId="contractAddress" className="mb-3">
                  <Form.Label>Contract Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter contract address"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="custom-input"
                  />
                </Form.Group>
                {context === 'evm' && (
                  <>
                    <Form.Group controlId="proxyAdminAddress" className="mb-3">
                      <Form.Label>Proxy Admin Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter proxy admin address"
                        value={proxyAdminAddress}
                        onChange={(e) => setProxyAdminAddress(e.target.value)}
                        className="custom-input"
                      />
                    </Form.Group>
                    <hr />
                    <Form.Group controlId="implementationAddress" className="mb-3">
                      <Form.Label>Implementation Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter implementation address"
                        value={implementationAddress}
                        onChange={(e) => setImplementationAddress(e.target.value)}
                        className="custom-input"
                      />
                    </Form.Group>
                  </>
                )}
                {context === 'cosmos' && (
                  <Form.Group controlId="newCodeId" className="mb-3">
                    <Form.Label>New Code ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter new code ID"
                      value={newCodeId}
                      onChange={(e) => setNewCodeId(e.target.value)}
                      className="custom-input"
                    />
                  </Form.Group>
                )}
              </>
            )}
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit" className="mt-3">
                Submit Proposal
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CreateProposal;
