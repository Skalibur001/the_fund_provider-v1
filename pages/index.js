import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Campaign from "../ethereum/campaign";
import web3 from '../ethereum/web3';
import Layout from "../components/Layout";
import { Link } from "../routes";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    const campaignName=[];
      for(let address of campaigns) {
          const instance = Campaign(address);
          const summary = await instance.methods.getSummary().call()
           campaignName.push(summary[5]);
      }
    return { campaigns,campaignName };
  }

    renderCampaigns()  {
        console.log(this.props.campaignName);
      const items=[];

      let i=0;

      for(let address of this.props.campaigns){
          items.push({
              header: this.props.campaignName[i],
              description: (
                  <Link route={`/campaigns/${address}`}>
                      <a>View Project</a>
                  </Link>
              ),
              fluid: true
          })
        i++;
      }

     console.log(items)

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Project"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
