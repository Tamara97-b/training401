import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import { Card, Button } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowerData: [],
    };
  }
  componentDidMount = () => {
    axios.get("http://localhost:3030/flowerapi").then((respone) => {
      this.setState({ flowerData: respone.data.flowerslist });
    });
   
  };
  addToFav = (favFlower) => {axios.post('http://localhost:3030/flower',favFlower)
  

}
  
  render() {
    console.log(this.state.flowerData);
    return (

      <div>
        
        {this.state.flowerData.map((el) => {
          return(
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={el.photo} />
            <Card.Body>
              <Card.Title>{el.name}</Card.Title>
              <Card.Text>
                {el.instructions}
              </Card.Text>
                <Button variant="primary" onClick={() => { this.addToFav({ name: el.name, instructions: el.instructions, photo: el.photo, email: this.props.auth0.user.email }) }}>add to fav</Button>
            </Card.Body>
          </Card>
        )})}
      </div>
    );
  }
}

export default withAuth0(Home);
