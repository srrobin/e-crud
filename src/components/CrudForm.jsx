/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
import React, { useState } from "react";
import { Button, Form, InputGroup, Offcanvas } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CreateProduct, GetCategory } from "../utils/Axios";

const CrudForm = ({ show, handleClose, initialValue = {} }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    categoryId: initialValue.categoryId || "",
    title: initialValue.title || "",
    price: initialValue.price || "",
    description: initialValue.description || "",
    images: initialValue.images || [],
  });
  console.log("formData", formData);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategory
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
  
    if (name === "images") {
      // Split the string by newline characters and filter out empty values
      updatedValue = value.split("\n").filter((url) => url.trim() !== "");
    }
  
    setFormData({
      ...formData,
      [name]: updatedValue,
    });
  };
  
  const { mutate } = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("https://api.escuelajs.co/api/v1/products/", newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // navigate("/admin");
    },
  });
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Validation checks
    const errors = [];
    if (!formData.title.trim()) {
      errors.push("title should not be empty");
    }
    if (typeof formData.title !== "string") {
      errors.push("title must be a string");
    }
    if (formData.price === "" || isNaN(formData.price) || formData.price <= 0) {
      errors.push("price must be a positive number");
    }
    if (!formData.description.trim()) {
      errors.push("description should not be empty");
    }
    if (typeof formData.description !== "string") {
      errors.push("description must be a string");
    }
    if (!formData.categoryId) {
      errors.push("categoryId should not be empty");
    }
    if (isNaN(formData.categoryId)) {
      errors.push("categoryId must be a number");
    }
    // if (!formData.images || formData.images.length === 0) {
    //   errors.push("images must contain at least 1 element");
    // } else {
    //   for (const image of formData.images) {
    //     if (!image.trim()) {
    //       errors.push("each value in images must be a URL address");
    //       break;
    //     }
    //   }
    // }
    if (!Array.isArray(formData.images) || formData.images.length === 0) {
      errors.push("images must contain at least 1 element");
    } else {
      for (const image of formData.images) {
        if (!image.trim()) {
          errors.push("each value in images must be a URL address");
          break;
        }
      }
    }
    
    if (errors.length > 0) {
      console.error("Validation errors:", errors);
      return;
    }
  
    // If validation passes, submit the form
    mutate(formData);
  };
  
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end"> 
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleFormSubmit}> 
          <Form.Group className="mb-3">
            <Form.Label>Product Category</Form.Label>
            <Form.Select 
              name="categoryId"
              onChange={handleChange}
            >
              <option>Choose...</option>
              {categories?.map((item, index) => (
                <option key={index} value={item.id}>{item.name}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="product title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="product price"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="product description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URLs (one per line)</Form.Label>
            <Form.Control
              type="text"
              name="images"
              value={formData.images.join("\n")}
              onChange={handleChange}
              placeholder="Enter image URLs"
            />
          </Form.Group>

          {formData.images.length > 0 && (
          <div>
            {formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Uploaded ${index + 1}`}
                style={{ width: "100px", marginTop: "10px", marginRight: "10px" }}
              />
            ))}
          </div>
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CrudForm;
