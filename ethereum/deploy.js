const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mneomic =
  "energy fan raise later script other excite able secret script soap slot";

let provider = new HDWalletProvider(
  mneomic,
  "https://rinkeby.infura.io/v3/48ae7282095548a7a1cf2ab60acb18e9"
);

const web3 = new Web3(provider);
web3.setProvider(provider);
//const CompileCampaign = path.resolve("build", "campaign.json");
const CompiledFactory = require("./build/CampaignFactory.json");

let accounts;
let result;

let deployfunc = async () => {
  accounts = await web3.eth.getAccounts();

  result = await new web3.eth.Contract(JSON.parse(CompiledFactory.interface))
    .deploy({ data: CompiledFactory.bytecode })
    .send({ from: accounts[0], gas: "2000000" });

  //console.log("selected account", accounts[0]);
  //console.log(interface);
  console.log("Deployed to: ", result.options.address);
};
deployfunc();
provider.engine.stop();
