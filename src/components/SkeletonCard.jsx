import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

const SkeletonCard = () => {
  return (
    <Card className="mb-3">
      <Placeholder as="div" animation="wave" style={{ height: '200px', width: '100%', backgroundColor: '#e0e0e0' }}>
      </Placeholder>
      <Card.Body>
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default SkeletonCard;
