import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitData: [],
    };
  }
  componentDidMount = () => {
    axios.get("http://localhost:3030/fruitapi").then((response) => {
      this.setState({ fruitData: response.data.fruits });
      console.log(response.data);
    });
  };
  addToFav = (addToFavObj) => {
    axios.post("http://localhost:3030/fruit", addToFavObj);
  };
  

  render() {
    return (
      <>
        {this.state.fruitData.map((item) => {
          return (
            <>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.price}</Card.Text>
                  <Button
                    onClick={() => {
                      this.addToFav({
                        email: this.props.auth0.user.email,
                        image: item.image,
                        name: item.name,
                        price: item.price,
                      });
                    }}
                    variant="primary"
                  >
                    add to fav
                  </Button>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </>
    );
  }
}

export default withAuth0(Home);
