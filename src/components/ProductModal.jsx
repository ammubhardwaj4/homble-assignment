import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductModal = ({ show, onHide, onAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    allergenInfo: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value
    }));
  };

  const handleAddProduct = () => {
    onAdd(product);
    setProduct({ name: '', description: '', allergenInfo: '' });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={product.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={product.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="allergenInfo">
            <Form.Label>Product Allergen Info</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter allergen info"
              value={product.allergenInfo}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddProduct}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
