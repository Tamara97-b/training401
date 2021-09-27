import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Jumbotron from 'react-bootstrap/Jumbotron';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { withAuth0 } from "@auth0/auth0-react";
// import './FavFlowers.css';

class UpdateForm extends React.Component {
  state = {
    showFlag: false,
  };
  handleClose = () => {
    this.setState({
      showFlag: false,
    });
  };
  handleShow = () => {
    this.setState({
      showFlag: true,
    });
  };
  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>
        <Modal show={this.state.showFlag} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Fruit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) =>
                this.props.update(
                  this.props.fruitItem._id,
                  this.props.fruitItem_email,
                  e
                )
              }
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  defaultValue={this.props.fruitItem.name}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Photo</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  defaultValue={this.props.fruitItem.image}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  defaultValue={this.props.fruitItem.price}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default withAuth0(UpdateForm);
