/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetCategory } from "../utils/Axios";

const CrudForm = ({ handleSubmit, initialValue }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const extractUrls = (images) => {
  //   const urlRegex = /(https?:\/\/[^\s]+)/g; 
  //   const urls = images.join("\n"); 
  //   const extractedUrls = urls.match(urlRegex); 
  //   return extractedUrls || []; 
  // };
  const extractUrls = (images) => {
    if (!images || !Array.isArray(images)) {
      return [];
    }
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = images.join("\n");
    const extractedUrls = urls.match(urlRegex);
    return extractedUrls || [];
  };
  const [formData, setFormData] = useState({
    categoryId: initialValue.categoryId || "",
    categoryName: initialValue.categoryName || "",
    title: initialValue.title || "",
    price: initialValue.price || "",
    description: initialValue.description || "",
    // images: initialValue.images || [],
    images: extractUrls(initialValue.images) || [],
  });

  console.log("formData", formData);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategory,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "images") {
      updatedValue = value.split("\n").filter((url) => url.trim() !== "");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "images" ? updatedValue : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Product Category</Form.Label>
        <Form.Select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option>Choose...</option>
          {categories?.map((item, index) => (
            <option key={index} value={item.id}>
              {item.id === formData.categoryId
                ? initialValue.categoryName
                : item.name}
            </option>
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
          // value={formData.images.join("\n")}
          value={formData.images}
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

      <Button size="sm" className="btn__bg" variant="secondary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CrudForm;
