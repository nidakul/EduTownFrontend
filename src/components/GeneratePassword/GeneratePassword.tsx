import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./generatePassword.css";
import { generatePassword } from "../../utilities/Constants/generatePassword";

type Props = {
  show: boolean;
  handleClose: () => void;
  setGeneratedPassword: (password: string) => void;
};

const GeneratePassword = (props: Props) => {
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (props.show) {
      const generatedPassword = generatePassword();
      setPassword(generatedPassword);
      props.setGeneratedPassword(generatedPassword);
    }
  }, [props.show]);
  return (
    <Modal
      className="generate-pass-modal"
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header>
        <Modal.Title>Otomatik Şifre Oluştur</Modal.Title>
      </Modal.Header>
      <Modal.Body>{password}</Modal.Body>
      <Modal.Footer>
        <Button className="form-btn" onClick={props.handleClose}>
          Kapat
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GeneratePassword;
