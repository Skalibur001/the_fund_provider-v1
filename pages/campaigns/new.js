import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
    name:"",
    description:"",
  };
  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const sign = await web3.eth.personal.sign("dataToSign", accounts[0]);

      console.log(" inside try catch")
      await factory.methods
        .createCampaign(this.state.minimumContribution , this.state.name, this.state.description)
        .send({
          from: accounts[0]
        });
      Router.pushRoute("/");
    } catch (err) {
      if(err.message.includes("Failed to subscribe to new newBlockHeaders to confirm the transaction receipts."))
      {
        this.setState({ errorMessage: "" });
        Router.pushRoute("/");
      }
      else {
        this.setState({errorMessage: err.message});
      }
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Project</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>

            <label>Name</label>
            <Input
                value={this.state.name}
                onChange={event =>
                    this.setState({ name: event.target.value })
                }
            />

            <label>Description</label>
            <Input
                value={this.state.description}
                onChange={event =>
                    this.setState({ description: event.target.value })
                }
            />

            <label>Minimum Contribution</label>
            <Input
                label="wei"
                labelPosition="right"
                value={this.state.minimumContribution}
                onChange={event =>
                    this.setState({ minimumContribution: event.target.value })
                }
            />

          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
