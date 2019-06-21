import React from "react";
import {
  Container,
  Card,
  CardHeader
} from "shards-react";

import FormComponent from "../components/components-overview/FormComponent";

const FormContainer = () => (
  <Container fluid className="main-content-container px-4 pb-4 pt-4">
    <Card small>
      <CardHeader className="border-bottom">
        <h6 className="m-0">Form Example</h6>
      </CardHeader>
      <FormComponent />
    </Card>
  </Container>
);

export default FormContainer;
