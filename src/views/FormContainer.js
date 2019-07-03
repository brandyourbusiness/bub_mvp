import React from "react";
import {
  Container,
  Card,
  CardHeader
} from "shards-react";

import { withApollo } from 'react-apollo';
import { GET_ALL_FORMS } from "../apollo/queries";

import FormComponent from "../components/components-overview/FormComponent";

class FormContainer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  componentWillMount(){
    this.props.client
      .query({
        query: GET_ALL_FORMS
      })
      .then(data => {
        console.log("DATA", data.data.getAllFormsList.list);
        this.setState({list: data.data.getAllFormsList.list})
      })
      .catch(e => {
        console.log(e);
      });
  }

  render = () => {
    let {list} = this.state;
    if(!list.length){
      return null;
    }
    return(
      <Container fluid className="main-content-container px-4 pb-4 pt-4">
        <Card small>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Form Example</h6>
          </CardHeader>
          <FormComponent list={list}/>
        </Card>
      </Container>
    )
  }
}

export default withApollo(FormContainer);
