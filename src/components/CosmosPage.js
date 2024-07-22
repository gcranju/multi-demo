import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container, Row, Col } from 'react-bootstrap';
import CreateProposal from './CreateProposal';
import ApproveProposals from './ApproveProposals';
import ExecuteProposals from './ExecuteProposals';
import ExecutedProposals from './ExecutedProposals';

function CosmosPage({ context }) {
  const [selectedComponent, setSelectedComponent] = useState('approve-proposals');
  const [selectedChain, setSelectedChain] = useState('Archway');
  const [proposals, setProposals] = useState([]);

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
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">
            MultiChainGov
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <NavDropdown title={`Chain: ${selectedChain}`} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleChainChange('Archway')}>Archway</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChainChange('Neutron')}>Neutron</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChainChange('Injective')}>Injective</NavDropdown.Item>
              </NavDropdown>
              <Button variant="outline-primary" className="ml-3">Wallet Address</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col md={2} className="d-none d-md-block bg-light vh-100 vertical-nav">
            <Nav defaultActiveKey="approve-proposals" className="flex-column">
            <Nav.Link
                className={selectedComponent === 'create-proposal' ? 'active' : ''}
                onClick={() => setSelectedComponent('create-proposal')}
              >
                Create Proposal
              </Nav.Link>
              <Nav.Link
                className={selectedComponent === 'approve-proposals' ? 'active' : ''}
                onClick={() => setSelectedComponent('approve-proposals')}
              >
                Approve Proposals
              </Nav.Link>
              <Nav.Link
                className={selectedComponent === 'execute-proposals' ? 'active' : ''}
                onClick={() => setSelectedComponent('execute-proposals')}
              >
                Execute Proposals
              </Nav.Link>
              {context === 'cosmos' && (
                <Nav.Link
                  className={selectedComponent === 'executed-proposals' ? 'active' : ''}
                  onClick={() => setSelectedComponent('executed-proposals')}
                >
                  Executed Proposals
                </Nav.Link>
              )}
            </Nav>
          </Col>
          <Col md={10} className="content">
            {renderComponent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CosmosPage;
