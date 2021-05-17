import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x45a112acb04160b01616Ff1FC4a908c8DDdF0e84"
);

export default instance;
