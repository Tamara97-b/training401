import React from "react";
import axios from "axios";
import { Card, Button} from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import FormAndModel from "./FormAndModel";

class FavFlowers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flowerData: [],
      showModal: false,
      selectedObj :{},
    };
  }
  
  componentDidMount = () => {
    axios
      .get(`http://localhost:3030/flower?email=${this.props.auth0.user.email}`)
      .then((response) => {
        this.setState({ flowerData: response.data });
        
      });
  };

  deleteobj = (deleted) => {
    axios.delete(`http://localhost:3030/flower/${deleted}`).then(() => {
      axios
        .get(`http://localhost:3030/flower?email=${this.props.auth0.user.email}`)
        .then((response) => {
          this.setState({ flowerData: response.data });
         
         
        });
    });
  };
  update = async (updated) => {
   await this.setState({showModal:!this.state.showModal,selectedObj:updated})
   

  }
  handleForm = (e) => {
    e.preventDefault();
    const requestBody = { name: e.target.name.value, photo: e.target.photo.value, instructions: e.target.instructions.value, email: this.props.auth0.user.email }
    axios.put(`http://localhost:3030/flower/${this.state.selectedObj._id}`, requestBody).then((responed) => {
      const newArr = this.state.flowerData.map((item) => {
        if (item._id === this.state.selectedObj._id) {
          return(item)

        }
        return (item)
        
      })
      this.setState({ flowerData: newArr })
      this.update()
    })
  }

  render() {
    console.log(this.state.flowerData);

   
    return (
     
      <div>

{
        this.state.showModal && <FormAndModel
          show= {this.state.showModal}
        handleForm={this.handleForm}
        handleClose={this.update}
        selectedObj={this.state.selectedObj} />
      }
        {this.state.flowerData.map((el) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={el.photo} />
              <Card.Body>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>{el.instructions}</Card.Text>
                <Button  onClick={() => {
                        this.deleteobj(el._id);
                }}>delete flower</Button>
                <Button  onClick={() => {
                        this.update(el);
                      }}>update flower</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default withAuth0(FavFlowers);
