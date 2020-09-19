# Uniswap Interface

[![Tests](https://github.com/Uniswap/uniswap-interface/workflows/Tests/badge.svg)](https://github.com/Uniswap/uniswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Uniswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [uniswap.org](https://uniswap.org/)
- Interface: [app.uniswap.org](https://app.uniswap.org)
- Docs: [uniswap.org/docs/](https://uniswap.org/docs/)
- Twitter: [@UniswapProtocol](https://twitter.com/UniswapProtocol)
- Reddit: [/r/Uniswap](https://www.reddit.com/r/Uniswap/)
- Email: [contact@uniswap.org](mailto:contact@uniswap.org)
- Discord: [Uniswap](https://discord.gg/Y7TF6QA)
- Whitepaper: [Link](https://hackmd.io/C-DvwDSfSxuh-Gd4WKE_ig)

## Accessing the Uniswap Interface

To access the Uniswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/Uniswap/uniswap-interface/releases/latest), 
or visit [app.uniswap.org](https://app.uniswap.org).

## Listing a token

Please see the
[@uniswap/default-token-list](https://github.com/uniswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Uniswap V2](https://uniswap.org/docs/v2/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.



### 将代码部署到GitHub Pages
参考地址：https://zhuanlan.zhihu.com/p/212397361?utm_source=wechat_session

##### 创建GitHub项目
> 创建项目的方法就不在这里讲了,不会的同学可以去搜索一下

##### 将前端代码添加到GitHub项目仓库
> 首先要删除原先Uniswap项目中的.git目录,在项目目录运行命令:

> $ cd uniswap-interface

> $ rm -rf .git

> 然后初始化git,并将Unsiwap前端代码添加到自己的项目仓库中
```
git init
git remote add origin https://github.com/用户名/项目名.git
```

### 安装并部署gh-pages
> 我们将通过gh-pages模块将前端代码部署到github.io,在前端代码的目录运行:

> $ yarn add gh-pages

> 接下来要编译react和部署gh-pages,在前端代码的目录运行:

> $ yarn build

> 修改前端代码目录中的package.json

```
$ vim package.json
{
  "name": "@uniswap/interface",
  "description": "Uniswap Interface",
  "homepage": "https://用户名.github.io/项目名称",//修改这里
......

// 添加部署的脚本,还是在package.json中
......
"scripts": {
    ......
    "deploy": "gh-pages -d build" //添加这一行
  },
```

> 保存退出之后,在前端代码的目录运行:
```
$ git add .
$ git commit -m "first commit"
$ git push
$ yarn deploy
```

> 现在在浏览器中打开https://用户名.github.io/项目名称/index.html就可以打开自己的交易所啦.
https://Jackie-Zhong.github.io/uniswap-front-interface/index.html
如果不输入地址结尾的index.html在项目刚部署之后会报错,过一段时间就可以不输入了.

### 扩展
##### 部署自己的weth
> 可以将以太坊浏览器中的weth源码拷贝下来,自己部署一个属于自己的weth合约

##### 可信token列表
> Uniswap有一个自己的可信token列表,同样被设置在项目目录/uniswap-interface/src/constants/index.ts文件中,在最后一行就是.你可以将这个链接地址的文件拷贝下来,设置成自己需要的可信token地址列表,然后上传到github目录中,再修改index.ts文件中的链接地址,这样就可以让你自己的交易所中拥有自己设置的可信token列表了
