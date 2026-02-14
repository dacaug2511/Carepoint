import React from 'react';
import { useDispatch } from 'react-redux';
import { setRole } from '../redux/slices/roleSlice';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const RoleSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    dispatch(setRole(role));
    navigate('/login');
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 text-center">
        <h2 className="mb-4">Select Your Role</h2>

        {['PATIENT', 'DOCTOR', 'ADMIN'].map((role) => (
          <Col md={4} key={role}>
            <Card
              className="p-4 shadow role-card"
              onClick={() => handleRoleSelect(role)}
              style={{ cursor: 'pointer' }}
            >
              <Card.Body>
                <h4>{role}</h4>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default RoleSelection;
