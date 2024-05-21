import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SkeletonCard from './SkeletonCard';

const Loading = () => {
  return (
    <Row>
      {Array.from({ length: 6 }).map((_, idx) => (
        <Col key={idx} xs={12} md={6} lg={4} className="mb-3">
          <SkeletonCard />
        </Col>
      ))}
    </Row>
  );
};

export default Loading;
