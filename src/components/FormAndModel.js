import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withAuth0 } from "@auth0/auth0-react";


class UpdateForm extends React.Component {
 
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit= {this.props.handleForm}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>name</Form.Label>
                <Form.Control type="text" name='name' defaultValue={this.props.selectedObj.name} />

              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>instructions</Form.Label>
                <Form.Control type="text" name='instructions' defaultValue={this.props.selectedObj.instructions}  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>photo</Form.Label>
                <Form.Control type="text" name='photo' defaultValue={this.props.selectedObj.photo}  />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>email</Form.Label>
                <Form.Control type="text" name='email' defaultValue={this.props.auth0.user.email}  />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withAuth0(UpdateForm);
