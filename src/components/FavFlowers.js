import React from "react";
import axios from "axios";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import FormAndModel from "./FormAndModel";
class FavFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitData: [],
    };
  }
  componentDidMount = () => {
    axios
      .get(`http://localhost:3030/fruit?email=${this.props.auth0.user.email}`)
      .then((response) => {
        this.setState({ fruitData: response.data });
        console.log(response.data);
        console.log(this.props.auth0.user.email);
      });
  };
  deleteobj = (deleted) => {
    axios.delete(`http://localhost:3030/fruit/${deleted}`).then(() => {
      axios
        .get(`http://localhost:3030/fruit?email=${this.props.auth0.user.email}`)
        .then((response) => {
          this.setState({ fruitData: response.data });
          console.log(response.data);
          console.log(this.props.auth0.user.email);
        });
    });
  };
  update = (_id, email, e) => {
    axios
      .put(`http://localhost:3030/fruit/${_id}`, {
        name: e.target.name.value,
        image: e.target.image.value,
        price: e.target.price.value,
      })
      .then(() => {
        axios
          .get(`http://localhost:3030/fruit?email=${email}`)
          .then((response) => {
            this.setState({ fruitData: response.data });
            console.log(response.data);
            console.log(this.props.auth0.user.email);
          });
      });
  };

  render() {
    return (
      <Container>
        <Row xs={4}>
          {this.state.fruitData.map((item) => {
            return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        this.deleteobj(item._id);
                      }}
                    >
                      Delete
                    </Button>

                    <FormAndModel update={this.update} fruitItem={item} />
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default withAuth0(FavFlowers);
