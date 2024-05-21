import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Rupees } from "../lib/constants";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Container className="mb-4">
      <Card className="shadow-sm" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
        <Card.Img variant="top" src={product.productImage} />
        <Card.Body>
          <Card.Title className="mb-3">{product.name}</Card.Title>
          <Card.Text className="mb-2 text-muted">{product.description}</Card.Text>
          <Card.Text className="mb-2"><strong>Allergen Info:</strong> {product.allergen_info}</Card.Text>
          <Card.Text className="mb-3"><strong>Cooking Instructions:</strong> {product.cooking_instruction}</Card.Text>
          <Row>
            <Col>
              <Card.Text><strong>Cost Price:</strong> {Rupees} {product.cost_price}</Card.Text>
            </Col>
            <Col>
              <Card.Text><strong>Selling Price:</strong> {Rupees} {product.selling_price}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductCard;
