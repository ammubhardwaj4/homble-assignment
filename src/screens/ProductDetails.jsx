import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card, Accordion, Spinner } from "react-bootstrap";
import { useApiRequest } from "../axios";
import { Rupees } from "../lib/constants";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, loading, error, fetchData } = useApiRequest(`/products/${id}`, 'get');

  const productDetailsSections = useMemo(() => {
    if (!product) return [];

    return [
      { key: "0", header: "Description", body: product?.description },
      { key: "1", header: "Allergen Info", body: product?.allergen_info },
      { key: "2", header: "Cooking Instructions", body: product?.cooking_instruction },
      { key: "3", header: "Cost Price", body: `${Rupees} ${product?.cost_price}` },
      { key: "4", header: "Selling Price", body: `${Rupees} ${product?.selling_price}` },
    ];
  }, [product]);

  const renderProductDetails = () => (
    <Accordion defaultActiveKey="0">
      {productDetailsSections.map(({ key, header, body }) => (
        <Accordion.Item eventKey={key} key={key}>
          <Accordion.Header>{header}</Accordion.Header>
          <Accordion.Body>{body}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );

  useEffect(() => {
    if (!product && !loading && !error) {
      fetchData();
    }
  }, [fetchData, product, loading, error]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      {product ? (
        <div className="col-md-12">
          <Card>
            <Card.Img 
              variant="top" 
              src={product?.productImage} 
              alt={product?.name} 
              style={{ maxHeight: '300px', objectFit: 'cover' }} 
            />
            <Card.Body>
              <Card.Title>{product?.name}</Card.Title>
              <Card.Text>{product?.description}</Card.Text>
            </Card.Body>
          </Card>
          {renderProductDetails()}
        </div>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
};

export default ProductDetails;
