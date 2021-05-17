import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    console.log(summary[6]);

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      title:summary[5],
      description:summary[6]
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
        title,
        description
    } = this.props;

    const items = [
      {
        header: title,
        description:`${description}`,
        style: { overflowWrap: 'break-word' }
      },
      {
        header: "Manager's Address ",
        meta: manager,
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: 'Minimum Contribution (wei)',
        meta: minimumContribution,
        description:
          'You must contribute at least this much wei to become an approver'
      },
      {
        header: 'Number of Requests',
        meta: requestsCount,
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header:'Number of Approvers',
        meta:  approversCount,
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header:'Campaign Balance (ether)',
        meta:  web3.utils.fromWei(balance, 'ether'),
        description:
          'The balance is how much money this campaign has left to spend.'
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Project's Details </h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
