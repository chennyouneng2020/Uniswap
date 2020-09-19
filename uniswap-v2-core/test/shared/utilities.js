"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("ethers/utils");
var PERMIT_TYPEHASH = utils_1.keccak256(utils_1.toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'));
function expandTo18Decimals(n) {
    return utils_1.bigNumberify(n).mul(utils_1.bigNumberify(10).pow(18));
}
exports.expandTo18Decimals = expandTo18Decimals;
function getDomainSeparator(name, tokenAddress) {
    return utils_1.keccak256(utils_1.defaultAbiCoder.encode(['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'], [
        utils_1.keccak256(utils_1.toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
        utils_1.keccak256(utils_1.toUtf8Bytes(name)),
        utils_1.keccak256(utils_1.toUtf8Bytes('1')),
        1,
        tokenAddress
    ]));
}
function getCreate2Address(factoryAddress, _a, bytecode) {
    var tokenA = _a[0], tokenB = _a[1];
    var _b = tokenA < tokenB ? [tokenA, tokenB] : [tokenB, tokenA], token0 = _b[0], token1 = _b[1];
    var create2Inputs = [
        '0xff',
        factoryAddress,
        utils_1.keccak256(utils_1.solidityPack(['address', 'address'], [token0, token1])),
        utils_1.keccak256(bytecode)
    ];
    var sanitizedInputs = "0x" + create2Inputs.map(function (i) { return i.slice(2); }).join('');
    return utils_1.getAddress("0x" + utils_1.keccak256(sanitizedInputs).slice(-40));
}
exports.getCreate2Address = getCreate2Address;
function getApprovalDigest(token, approve, nonce, deadline) {
    return __awaiter(this, void 0, void 0, function () {
        var name, DOMAIN_SEPARATOR;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, token.name()];
                case 1:
                    name = _a.sent();
                    DOMAIN_SEPARATOR = getDomainSeparator(name, token.address);
                    return [2 /*return*/, utils_1.keccak256(utils_1.solidityPack(['bytes1', 'bytes1', 'bytes32', 'bytes32'], [
                            '0x19',
                            '0x01',
                            DOMAIN_SEPARATOR,
                            utils_1.keccak256(utils_1.defaultAbiCoder.encode(['bytes32', 'address', 'address', 'uint256', 'uint256', 'uint256'], [PERMIT_TYPEHASH, approve.owner, approve.spender, approve.value, nonce, deadline]))
                        ]))];
            }
        });
    });
}
exports.getApprovalDigest = getApprovalDigest;
function mineBlock(provider, timestamp) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            ;
                            provider._web3Provider.sendAsync({ jsonrpc: '2.0', method: 'evm_mine', params: [timestamp] }, function (error, result) {
                                if (error) {
                                    reject(error);
                                }
                                else {
                                    resolve(result);
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mineBlock = mineBlock;
function encodePrice(reserve0, reserve1) {
    return [reserve1.mul(utils_1.bigNumberify(2).pow(112)).div(reserve0), reserve0.mul(utils_1.bigNumberify(2).pow(112)).div(reserve1)];
}
exports.encodePrice = encodePrice;
