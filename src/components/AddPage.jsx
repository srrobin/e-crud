import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { themeMode } from "../context/ModeProvider";
import CrudForm from "./CrudForm";

const AddPage = ({ show, handleClose }) => {
  const queryClient = useQueryClient();
  const { mode } = themeMode();

  const { mutate } = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("https://api.escuelajs.co/api/v1/products/", newTodo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // navigate("/admin");
    },
  });

  const handleSubmit = (formData) => {
    mutate(formData);
    handleClose();
    // setFormData({});
  };
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className={mode ? "text-bg-dark" : "text-bg-light"}> 
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <CrudForm
          initialValue={{}}
          handleSubmit={handleSubmit}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AddPage;
