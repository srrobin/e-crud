import React from "react";
import { Offcanvas } from "react-bootstrap";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { themeMode } from "../context/ModeProvider";
import CrudForm from "./CrudForm";
import { DetailsProducts, updateProducts } from "../utils/Axios";

const UpdatePage = ({ id, update, setUpdate }) => {
  const { mode } = themeMode();
  const handleClose = () => setUpdate(false);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => DetailsProducts(id)
  });

  const { mutate } = useMutation({
    mutationFn: updateProducts,
    onSuccess: (data) => {
      queryClient.setQueryData(["products", id], data);
      queryClient.invalidateQueries(["products", id]);
      handleClose();
    },
  });  

  if (isLoading) return "Loading...";
  if (isError) return `An error has occurred: ${error.message}`;

  const handleSubmit = (formData) => {
    mutate({
      id, ...formData
    });
  };

  // Check if data is available before rendering the Offcanvas
  if (!data) return null;

  return (
    <Offcanvas show={update} onHide={handleClose} placement="end" className={mode ? "text-bg-dark" : "text-bg-light"}> 
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Add Product</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <CrudForm
          initialValue={{
            categoryId: data.category.id,
            categoryName: data.category.name,
            title: data.title,
            price: data.price,
            description: data.description,
            images: data.images,
          }}
          // initialValue={data}
          handleSubmit={handleSubmit}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UpdatePage;
