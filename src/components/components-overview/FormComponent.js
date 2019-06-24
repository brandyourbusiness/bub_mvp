import React,{Component} from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";

const elements = [
  {
    label: "Email",
    type: "email",
    division: 6,
  },
  {
    label: "Password",
    type: "password",
    division: 6,
  },
  {
    label: "showKYC",
    group: "showkyc",
    type: "toggle",
    division: 2,
    values: [
      {
        label: "Email",
        type: "email",
        division: 6,
      },
      {
        label: "Password",
        type: "password",
        division: 6,
      }  
    ] 
  }
]

class FormComponent extends Component {

  constructor(props){
    super(props);
    this.state= {}
  }

  toggleState = (item) => {
    this.setState(prevState => ({
      [item] : !prevState[item]
    }),
    ()=>{
      // console.log(this.state[item.group])
    })    
  }

  handleChange = (key, value) => {
    this.setState(prevState => ({
      [key] : value
    }),
    ()=>{
        console.log(this.state)
    })    
  }

  generateElement = (element) => {
    switch(element.type){
      case "email":
      case "password":
      case "input":
        return (
          <FormInput
            id={`fe${element.label}`}
            type={element.type}
            placeholder={element.label}
          />
        );
      case "select":
        return (
          <FormSelect id={`fe${element.label}`}
          >
            <option>Choose...</option>
            <option>...</option>
          </FormSelect>
        );
      case "toggle":
        return(
          <FormCheckbox 
            toggle={true}
            small={true}>
          </FormCheckbox>
        )
      default :
        return(
          <FormInput
            id={`fe${element.label}`}
            placeholder={element.placeholder || element.label}
          />
        )      
    }
  }

  render (){
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form>
                <Row>
                  {
                    elements.map((item, index) => (
                      !item.group ? 
                        (<Col md={item.division || 12} key={index}>
                            <label htmlFor={`fe${item.label}`}>{item.label}</label>
                              <span onChange={(e) => this.handleChange(item.label, e.target.value)}>{this.generateElement(item)}</span>
                          </Col>) : 
                        (<React.Fragment>
                          <Col md={item.division || 12} key={index}>
                            <label >
                              {item.label}
                            </label>
                            <span onChange={(e) => this.toggleState(item.label)}>
                              {this.generateElement(item)}
                            </span>
                          </Col>
                          {this.state[item.label] && item.values.map((value, ind) => (
                            <Col md={value.division || 12} key={ind}>
                              <label htmlFor={`fe${value.label}`}>{value.label}</label>
                                {this.generateElement(value)}
                            </Col>
                          ))}
                          </React.Fragment>
                        )
                    ))
                  }
                </Row>
                <FormGroup>
                  <FormCheckbox>
                    {/* eslint-disable-next-line */}I agree with your{" "}
                    <a href="#">Privacy Policy</a>.
                  </FormCheckbox>
                </FormGroup>
                <Button type="submit">Create New Account</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

export default FormComponent;
