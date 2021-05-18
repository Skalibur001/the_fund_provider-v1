import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x5BDF29746f7aCA68Cb423F4BFa240dCcbB8E9c16"
);

export default instance;
