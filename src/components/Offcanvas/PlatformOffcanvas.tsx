import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./platformOffcanvas.css";

const PlatformOffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        mdlsk
      </Button>
      <Offcanvas
        placement="start"
        enforceFocus={false}
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column align-items-center">
            <img
              src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              className="img-fluid rounded-circle"
            />
            <h5 className="mt-2 mb-0">isim soyisim</h5>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default PlatformOffcanvas;
