import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0xbA6c075D78Cfa48905A7353BaC03da87f071aF36"
);

export default instance;
