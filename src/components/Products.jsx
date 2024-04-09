/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/control-has-associated-label */

// Importing necessary dependencies
import React, { useState } from "react";
import { Button, Card, Stack, Table } from "react-bootstrap";
import {
  AiFillFilter,
  AiOutlineAppstoreAdd,
  AiTwotoneEdit
} from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { useQuery, useMutation, keepPreviousData, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import { FaFileCsv } from "react-icons/fa6";
import CrudForm from "./CrudForm";
import Details from "./Details";
import AuthUser from "../utils/AuthUser";
import { DeleteProducts } from "../utils/Axios";
import { themeMode } from "../context/ModeProvider";
import AddPage from "./AddPage";
import UpdatePage from "./UpdatePage";

// Define the functional component for managing products
const Products = () => {
  const quaryClient = useQueryClient();
  const { mode } = themeMode();
  // Fetch AxiosInstance from AuthUser
  const { AxiosInstance } = AuthUser();

  // State variables for managing modal visibility and search parameters
  const [dId, setDId] = useState(null);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [searchParam, setSearchParam] = useSearchParams({ offset: 0, limit: 6 });
  const limit = parseInt(searchParam.get("limit" || 0));
  const offset = parseInt(searchParam.get("offset" || 0));
  // const q = searchParam.get("q") || "";

  // Function to handle closing of modal
  const handleClose = () => setShow(false);

  // Function to toggle modal visibility
  const toggleShow = () => {
    console.log("message show");
    setShow((s) => !s);
  };

  // Fetch products data from API using useQuery hook
  const { isLoading, isError, error, data: products } = useQuery({
    queryKey: ["products", limit, offset],
    queryFn: async () => {
      const URL = `/products?offset=${offset}&limit=${limit}`;
      // const URL = "/products";
      const res = await AxiosInstance.get(URL);
      return res.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60
  });
  console.log("🚀 ~ Products ~ products:", products);

  // Function to handle pagination
  const handlePagination = (limitCount) => {
    setSearchParam((prev) => {
      prev.set("offset", Math.max(offset + limitCount, 0));
      return prev;
    });
  };

  // Function to handle deletion of a product
  const { mutate } = useMutation({
    mutationFn: DeleteProducts,
    onSuccess: () => {
      quaryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin");
    }
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      mutate(id);
    }
  };
  const handleDetails = (id) => {
    setModalShow(true);
    setDId(id);
  };
  const handleUpdate = (id) => {
    setUpdate(true);
    setDId(id);
  };
  // Calculate current page for pagination
  const currentPage = Math.ceil(offset / limit) + 1;

  // Render loading message while data is being fetched
  if (isLoading) return "Loading...";
  // Render error message if there's an error fetching data
  if (isError) return `An error has occurred: ${error.message}`;

  // Render the UI
  return (
    <div>
      <Card>
        <Card.Header className="header__bg">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 title__color">Products List</div>
            <Button
              size="sm"
              onClick={toggleShow}
              className="btn__bg ms-auto"
              variant="secondary"
            >
              <AiOutlineAppstoreAdd />
            </Button>
            <Button size="sm" className="btn__bg" variant="secondary">
              <AiFillFilter />
            </Button>
            <Button size="sm" className="btn__bg" variant="secondary">
              <FaFileCsv />
            </Button>
            <Button size="sm" className="btn__bg" variant="secondary">
              <FaFilePdf />
            </Button>
          </Stack>
        </Card.Header>
        <Card.Body className={mode ? "text-bg-dark" : "text-bg-light"}>
          <Table hover responsive="md" className={mode ? "table-dark" : ""}>
            <thead>
              <tr>
                <th>SN</th>
                <th>Category</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products && products?.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.category.name}</td>
                  <td>{item.title}</td>
                  <td>
                    {Array.isArray(item.images) && item.images.length > 0 && (
                    <img
                      src={item.images[0].replace(/['"]+/g, "").replace(/^\[|\]$/g, "")} 
                      alt=""
                      style={{
                        height: "30px",
                        width: "30px",
                        objectFit: "cover"
                      }}
                    />
                    )}
                  </td>
                  <td>{item.price}$</td>
                  <td>
                    <Button size="sm" className="btn__bg me-2" variant="secondary" onClick={() => handleDelete(item.id)}><TiDelete /></Button>
                    <Button size="sm" className="btn__bg me-2" variant="secondary" onClick={() => handleUpdate(item.id)}><AiTwotoneEdit /></Button>
                    <Button size="sm" className="btn__bg" onClick={() => handleDetails(item.id)} variant="secondary"><BiSolidMessageSquareDetail /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      <div className="mt-5">
        <Stack direction="horizontal" gap={3}>
          <Button
            className="btn__bg me-2"
            variant="secondary"
            size="sm"
            onClick={() => handlePagination(-limit)}
            disabled={offset < limit}
          >
            <GrFormPrevious />
          </Button>
          <div className="page__count">{currentPage}</div>
          <Button
            onClick={() => handlePagination(limit)}
            disabled={offset + limit >= 50}
            className="btn__bg"
            variant="secondary"
            size="sm"
          >
            <MdOutlineNavigateNext />
          </Button>
        </Stack>
      </div>
      
      <AddPage show={show} handleClose={handleClose} />
      {dId !== null && <UpdatePage id={dId} update={update} setUpdate={setUpdate} />}
      { dId && <Details id={dId} show={modalShow} onHide={() => setModalShow(false)} />}

    </div>
  );
};
export default Products;
