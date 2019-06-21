import React from "react";
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
  [
    {
      label: "Email",
      tag: "input",
      type: "email",
      division: 6,
      options:{
        placeholder: "Email"
      }
    },
    {
      label: "Password",
      tag: "input",
      type: "password",
      division: 6,
      options:{
        placeholder: "Password"
      }
    }
  ],
  {
    label: "Address",
    tag: "input",
    options: {
      placeholder: "1234 Main St"
    }
  }
]

const FormComponent = () => (
  <ListGroup flush>
    <ListGroupItem className="p-3">
      <Row>
        <Col>
          <Form>
            <Row form className="form-group">
              {elements.map((element, i) => (
                Array.isArray(element) ?
                  (<Row form className="form-group">
                      {element.map((item, index) => (
                        <Col md="6" key={i}>
                          <label htmlFor={`fe${item.label}`}>{item.label}</label>
                          <FormInput
                            id={`fe${item.label}`}
                            type={item.type}
                            placeholder={item.placeholder || item.label}
                          />
                        </Col>
                      ))}
                    </Row>
                  ) :
                (<Col md="6" key={i}>
                  <label htmlFor={`fe${element.label}`}>{element.label}</label>
                  <FormInput
                    id={`fe${element.label}`}
                    type={element.type}
                    placeholder={element.placeholder || element.label}
                  />
                </Col>)
              ))}
            </Row>

            <FormGroup>
              <label htmlFor="feInputAddress">Address</label>
              <FormInput id="feInputAddress" placeholder="1234 Main St" />
            </FormGroup>

            <FormGroup>
              <label htmlFor="feInputAddress2">Address 2</label>
              <FormInput
                id="feInputAddress2"
                placeholder="Apartment, Studio or Floor"
              />
            </FormGroup>

            <Row form>
              <Col md="6" className="form-group">
                <label htmlFor="feInputCity">City</label>
                <FormInput id="feInputCity" />
              </Col>
              <Col md="4" className="form-group">
                <label htmlFor="feInputState">State</label>
                <FormSelect id="feInputState">
                  <option>Choose...</option>
                  <option>...</option>
                </FormSelect>
              </Col>
              <Col md="2" className="form-group">
                <label htmlFor="feInputZip">Zip</label>
                <FormInput id="feInputZip" />
              </Col>
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
);

export default FormComponent;
