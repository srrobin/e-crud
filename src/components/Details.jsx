import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useQuery, useMutation, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { DetailsProducts } from "../utils/Axios";

const Details = ({ show, onHide, id }) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => DetailsProducts(id)
  });
  console.log("🚀 ~ DetailsPage ~ DetailsPage:", data);

  const handlePdf = () => {
    const newTab = window.open(`/details/pdf/${id}`, "_blank");
    newTab.focus();
    onHide();
  };
  
  if (isLoading) return "Loading...";
  if (isError) return `An error has occurred: ${error.message}`;
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              {data.category.creationAt}
            </Col>
            <Col xs={12} md={6}>
              {data.category.name}
            </Col>
          </Row>
          <Row>
            <Col>
              <img src={data.images[0].replace(/['"]+/g, "").replace(/^\[|\]$/g, "")} alt="" />
            </Col>
          </Row>
          <Row>
            <Col>
              {data.title}
            </Col>
            <Col>
              {data.price}
            </Col>
          </Row>
          <Row>
            <Col>
              {data.description}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="secondary" onClick={handlePdf}> Make Pdf</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Details;
