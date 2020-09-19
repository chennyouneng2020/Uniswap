# Uniswap V2

[![Actions Status](https://github.com/Uniswap/uniswap-v2-core/workflows/CI/badge.svg)](https://github.com/Uniswap/uniswap-v2-core/actions)
[![Version](https://img.shields.io/npm/v/@uniswap/v2-core)](https://www.npmjs.com/package/@uniswap/v2-core)

In-depth documentation on Uniswap V2 is available at [uniswap.org](https://uniswap.org/docs).

The built contract artifacts can be browsed via [unpkg.com](https://unpkg.com/browse/@uniswap/v2-core@latest/).

# Local Development

nodejs版本必须是10以上。

将tsconfig.json的target改为es6。

## Install Dependencies

`yarn` // 执行之后生成node_modules

// 其它指令：yarn cache clean --force

## Compile Contracts

`yarn compile` // 编译sol文件

## Run Tests

`yarn test` // 测试部署文件