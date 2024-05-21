import React, { useState, lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row, Toast } from 'react-bootstrap';
import { useApiRequest, postRequest } from '../axios';
import ProductModal from '../components/ProductModal';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorComponent from '../components/ErrorComponent';

const ProductCard = lazy(() => import('../components/ProductCard'));

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showToast, setShowToast] = useState(false);

  const { data, error, loading: isLoading } = useApiRequest('/products');

  const handleAddProduct = async (productDetails) => {
    try {
      await postRequest('/products', productDetails);
      setShowModal(false);
      setShowToast(true);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortedProducts = React.useMemo(() => {
    return data?.sort((a, b) => {
      return sortOrder === 'asc' ? a.selling_price - b.selling_price : b.selling_price - a.selling_price;
    });
  }, [data, sortOrder]);

  return (
    <Container>
      <h1>Product Listing Page</h1>
      <Row className="justify-content-between mb-4">
        <Col xs="auto">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Product
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={toggleSortOrder}>
            Sort by Price: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </Col>
      </Row>
      {error && <ErrorComponent error={error} onDismiss={() => setShowModal(false)} />}

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <Row>
          {sortedProducts?.map(product => (
            <Col key={product.id} xs={12} md={6} lg={4} className="mb-3">
              <Suspense fallback={<div>Loading...</div>}>
                <ProductCard product={product} onAdd={() => setShowModal(true)} />
              </Suspense>
            </Col>
          ))}
        </Row>
      )}
      <ProductModal show={showModal} onHide={() => setShowModal(false)} onAdd={handleAddProduct} />

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-fixed top-0 end-0 bg-success"
        style={{ zIndex: 9999 }}
        delay={3000}
        autohide
      >
        <Toast.Header closeButton={false} bg="success" text="white">
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Product added successfully!</Toast.Body>
      </Toast>

    </Container>
  );
};

export default Home;
