import { useQueries, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Form, InputGroup, Offcanvas } from "react-bootstrap";
import { GetCat, GetCatItem, GetData } from "../utils/Axios";

const CrudForm = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    category: "",
    productId: "",
    quantity: "",
  });
  const {
    isLoading,
    isError,
    error,
    data: categoris,
  } = useQuery({
    queryKey: ["categoris"],
    queryFn: GetCat,
  });
  console.log("🚀 ~ CrudForm ~ catIds:", categoris);

  const { data: catproduct } = useQueries({
    queries: categoris
      ? categoris.map((category) => {
        return {
          queryKey: ["categoryproduct", category],
          queryFn: () => GetCatItem(category),
        };
      })
      : [],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
  };
  console.log("🚀 ~ CrudForm ~ ProductByCat:", catproduct);
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select 
              name="category"
              onChange={handleChange}
            >
              <option>Choose...</option>
              {categoris?.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select 
              name="category"
              onChange={handleChange}
            >
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
          <InputGroup className="mb-3">
            <Button variant="outline-secondary">+</Button>
            <Form.Control aria-label="Example text with two button addons" />
            <Button variant="outline-secondary">-</Button>
          </InputGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CrudForm;
