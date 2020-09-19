const UniswapV2Factory = artifacts.require("UniswapV2Factory");
const UniswapV2Router02 = artifacts.require("UniswapV2Router02");
const feeToSetter = '0xf7FC9720b91BBb674064bCd72ca8F5Db5Ad33c57';
const WETH = {
    // mainnet:'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    // ropsten:'0xc778417E063141139Fce010982780140Aa0cD5Ab',
    rinkeby: '0x12763E7C0cf7D0be586DE25DF1d983210818557C',
    // goerli:'0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    // kovan:'0xd0A1E359811322d97991E03f863a0C30C2cF029C'
};
module.exports = (deployer, network, accounts) => {
    deployer.deploy(UniswapV2Factory, feeToSetter).then((FactoryInstance)=>{
        return deployer.deploy(UniswapV2Router02,FactoryInstance.address,WETH[network]);
    });
};