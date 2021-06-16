import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      if(err.message.includes("Failed to subscribe to new newBlockHeaders to confirm the transaction receipts."))
      {
        console.log(typeof (err.message));
        this.setState({ errorMessage: "" });
        Router.replaceRoute(`/campaigns/${this.props.address}`);
      }
      else {
        console.log(typeof (err.message));
        this.setState({errorMessage: err.message}).then(data=>{
          if(err.message.includes("Provided address "+"undefined"+" is invalid, the capitalization checksum test failed, or its an indrect IBAN address which can't be converted."))
          {alert("Address not available , try loging in to metamask")}
          else
            alert(err.message);
        })
        }
    }

    this.setState({ loading: false, value: '' });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>

        {/*<Message error header="Oops!" content={this.state.errorMessage} />*/}
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
