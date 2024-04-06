/* eslint-disable radix */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useState } from "react";
import {
  Button,
  Card,
  Form,
  InputGroup,
  OverlayTrigger,
  Pagination,
  Popover,
  Stack,
  Table,
  Tooltip,
} from "react-bootstrap";
import {
  AiFillFilter,
  AiOutlineAppstoreAdd,
  AiFillEye,
  AiFillDelete,
  AiTwotoneEdit,
} from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { RiMenuSearchFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import CrudForm from "./CrudForm";
import Details from "./Details";

const Products = () => {
  const [show, setShow] = useState(false);
  // const [products, setProducts] = useState();
  const [modalShow, setModalShow] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [searchParam, setSearchParam] = useSearchParams({
  //   offset: 0,
  //   limit: 4,
  // });
  // const limit = parseInt(searchParam.get("limit" || 0));
  // const offset = parseInt(searchParam.get("offset" || 0));
  // const q = searchParam.get("q") || "";
  const handleClose = () => setShow(false);
  const toggleShow = () => {
    console.log("message show");
    setShow((s) => !s);
  };
  // const currentPage = Math.ceil(offset / limit) + 1;
  // const totalPages = Math.ceil(products.total / limit);
  // Pagination click handler
  // const handlePaginationClick = (page) => {
  //   setCurrentPage(page);
  // };
  // console.log("🚀 ~ Products ~ totalPages:", totalPages);
  const popover = (
    <Popover id="popover-basic" className="z-1">
      <Popover.Body className="d-grid gap-2">
        <Button variant="secondary" size="sm">
          {" "}
          <AiFillDelete /> Delete
        </Button>
        <Button variant="secondary" size="sm">
          {" "}
          <AiTwotoneEdit /> Update
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setModalShow(true)}
        >
          <AiFillEye /> View
        </Button>
      </Popover.Body>
    </Popover>
  );
  return (
    <div>
      <Card>
        <Card.Header className="header__bg">
          <Stack direction="horizontal" gap={3}>
            <div className="p-2 title__color">Selected Produts</div>
            <InputGroup>
              <InputGroup.Text>
                <RiMenuSearchFill />
              </InputGroup.Text>
              <Form.Control name="search" placeholder="Search category" />
            </InputGroup>
            <div className="me-2 ms-auto">
              <OverlayTrigger overlay={<Tooltip>Selected Produts </Tooltip>}>
                <span className="d-inline-block">
                  <Button
                    onClick={toggleShow}
                    className="btn__bg"
                    variant="secondary"
                  >
                    <AiOutlineAppstoreAdd />
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
            <div className="me-1">
              <OverlayTrigger overlay={<Tooltip>Global Search </Tooltip>}>
                <span className="d-inline-block">
                  <Button className="btn__bg" variant="secondary">
                    <AiFillFilter />
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
            <div className="me-1">
              <OverlayTrigger overlay={<Tooltip>PDF Print</Tooltip>}>
                <span className="d-inline-block">
                  <Button className="btn__bg" variant="secondary">
                    <FaFilePdf />
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
            <div className="me-1">
              <OverlayTrigger overlay={<Tooltip>CSV Print</Tooltip>}>
                <span className="d-inline-block">
                  <Button className="btn__bg" variant="secondary">
                    <FaFileCsv />
                  </Button>
                </span>
              </OverlayTrigger>
            </div>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Table hover responsive="md">
            <thead>
              <tr>
                <th>SN</th>
                <th>Category</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4</td>
                <td>4</td>
                <td>4</td>
                <td>5</td>
                <td>$</td>
                <td>2</td>
                <td>240 $</td>
                <td>paid</td>
                <td>
                  <OverlayTrigger
                    rootClose
                    trigger="click"
                    overlay={popover}
                  >
                    <Button variant="secondary" className="btn__bg">
                      <CiMenuKebab />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
                
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* <Pagination className="mt-4">
        <Pagination.Prev
          onClick={() => handlePaginationClick(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <Pagination.Item
            key={pageNumber + 1}
            onClick={() => handlePaginationClick(pageNumber + 1)}
            active={pageNumber + 1 === currentPage}
          >
            {pageNumber + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePaginationClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination> */}

      <CrudForm show={show} handleClose={handleClose} />
      <Details show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};

export default Products;
