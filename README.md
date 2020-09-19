# Uniswap
### 关于uniswap源码的执行-uniswap-v2-core为核心合约-uniswap-v2-periphery为周边合约
##### 学习视频：https://www.zhihu.com/zvideo/1277985686630133760
##### 详解：
> uniswap-v2-core主要做编译和部署合约到指定的以太坊网络，其中最主要的合约是工厂合约，主要是创建交易对，依赖于配对合约。

> uniswap-v2-periphery主要做编译和部署合约到指定的以太坊网络，其中最主要的是路由合约，工厂合约和配对合约需要通过路由合约调用才能更好的完成交易所的全部功能。

### 如何开发一款类似的uniswap产品？
##### 步骤：
> 1.采用truffle框架

> 2.连接mainnet

> 3.从remix的mainnet部署WETH合约，获取合约地址

> 4.部署工厂合约UniwapV2Factory.sol和路由合约UniswapV2Router02.sol，获取工厂合约和路由合约的合约地址

> 5.部署前端代码uniswap-front-interface，将上述的合约地址对应到相应的代码中

> 6.如果要有自己的代币，必须把自己的代币部署到相应的dex

##### uniswap_deploy和uniswap-front-interface参考文档：
https://zhuanlan.zhihu.com/p/212397361?utm_source=wechat_session

### 如何在uniswap发币
链接：https://www.icointime.com/post/908252215416.html

### 手把手教你搭建Token-List | 解决uniswap上币没有logo的问题
链接：https://blog.csdn.net/zgsdzczh/article/details/108368485#%E4%B8%80%E3%80%81%E5%88%9B%E5%BB%BAtoken-list.json%E6%96%87%E4%BB%B6

### 如何创建一个ERC20代币并将其接入Uniswap去中心化 交换协议以便增减这个代币的流动性。
http://blog.hubwiz.com/2020/06/28/uniswap-developer-guide/
源码：https://github.com/oceanprotocol/Nautilus/tree/master/3-uniswap 

