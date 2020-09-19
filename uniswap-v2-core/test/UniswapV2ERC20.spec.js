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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importStar(require("chai"));
var constants_1 = require("ethers/constants");
var utils_1 = require("ethers/utils");
var ethereum_waffle_1 = require("ethereum-waffle");
var ethereumjs_util_1 = require("ethereumjs-util");
var utilities_1 = require("./shared/utilities");
var ERC20_json_1 = __importDefault(require("../build/ERC20.json"));
chai_1.default.use(ethereum_waffle_1.solidity);
var TOTAL_SUPPLY = utilities_1.expandTo18Decimals(10000);
var TEST_AMOUNT = utilities_1.expandTo18Decimals(10);
describe('UniswapV2ERC20', function () {
    var provider = new ethereum_waffle_1.MockProvider({
        hardfork: 'istanbul',
        mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
        gasLimit: 9999999
    });
    var _a = provider.getWallets(), wallet = _a[0], other = _a[1];
    var token;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethereum_waffle_1.deployContract(wallet, ERC20_json_1.default, [TOTAL_SUPPLY])];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('name, symbol, decimals, totalSupply, balanceOf, DOMAIN_SEPARATOR, PERMIT_TYPEHASH', function () { return __awaiter(_this, void 0, void 0, function () {
        var name, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, token.name()];
                case 1:
                    name = _g.sent();
                    chai_1.expect(name).to.eq('Uniswap V2');
                    _a = chai_1.expect;
                    return [4 /*yield*/, token.symbol()];
                case 2:
                    _a.apply(void 0, [_g.sent()]).to.eq('UNI-V2');
                    _b = chai_1.expect;
                    return [4 /*yield*/, token.decimals()];
                case 3:
                    _b.apply(void 0, [_g.sent()]).to.eq(18);
                    _c = chai_1.expect;
                    return [4 /*yield*/, token.totalSupply()];
                case 4:
                    _c.apply(void 0, [_g.sent()]).to.eq(TOTAL_SUPPLY);
                    _d = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(wallet.address)];
                case 5:
                    _d.apply(void 0, [_g.sent()]).to.eq(TOTAL_SUPPLY);
                    _e = chai_1.expect;
                    return [4 /*yield*/, token.DOMAIN_SEPARATOR()];
                case 6:
                    _e.apply(void 0, [_g.sent()]).to.eq(utils_1.keccak256(utils_1.defaultAbiCoder.encode(['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'], [
                        utils_1.keccak256(utils_1.toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')),
                        utils_1.keccak256(utils_1.toUtf8Bytes(name)),
                        utils_1.keccak256(utils_1.toUtf8Bytes('1')),
                        1,
                        token.address
                    ])));
                    _f = chai_1.expect;
                    return [4 /*yield*/, token.PERMIT_TYPEHASH()];
                case 7:
                    _f.apply(void 0, [_g.sent()]).to.eq(utils_1.keccak256(utils_1.toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)')));
                    return [2 /*return*/];
            }
        });
    }); });
    it('approve', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, chai_1.expect(token.approve(other.address, TEST_AMOUNT))
                        .to.emit(token, 'Approval')
                        .withArgs(wallet.address, other.address, TEST_AMOUNT)];
                case 1:
                    _b.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, token.allowance(wallet.address, other.address)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).to.eq(TEST_AMOUNT);
                    return [2 /*return*/];
            }
        });
    }); });
    it('transfer', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, chai_1.expect(token.transfer(other.address, TEST_AMOUNT))
                        .to.emit(token, 'Transfer')
                        .withArgs(wallet.address, other.address, TEST_AMOUNT)];
                case 1:
                    _c.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(wallet.address)];
                case 2:
                    _a.apply(void 0, [_c.sent()]).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT));
                    _b = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(other.address)];
                case 3:
                    _b.apply(void 0, [_c.sent()]).to.eq(TEST_AMOUNT);
                    return [2 /*return*/];
            }
        });
    }); });
    it('transfer:fail', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chai_1.expect(token.transfer(other.address, TOTAL_SUPPLY.add(1))).to.be.reverted]; // ds-math-sub-underflow
                case 1:
                    _a.sent(); // ds-math-sub-underflow
                    return [4 /*yield*/, chai_1.expect(token.connect(other).transfer(wallet.address, 1)).to.be.reverted]; // ds-math-sub-underflow
                case 2:
                    _a.sent(); // ds-math-sub-underflow
                    return [2 /*return*/];
            }
        });
    }); });
    it('transferFrom', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, token.approve(other.address, TEST_AMOUNT)];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, chai_1.expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
                            .to.emit(token, 'Transfer')
                            .withArgs(wallet.address, other.address, TEST_AMOUNT)];
                case 2:
                    _d.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, token.allowance(wallet.address, other.address)];
                case 3:
                    _a.apply(void 0, [_d.sent()]).to.eq(0);
                    _b = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(wallet.address)];
                case 4:
                    _b.apply(void 0, [_d.sent()]).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT));
                    _c = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(other.address)];
                case 5:
                    _c.apply(void 0, [_d.sent()]).to.eq(TEST_AMOUNT);
                    return [2 /*return*/];
            }
        });
    }); });
    it('transferFrom:max', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, token.approve(other.address, constants_1.MaxUint256)];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, chai_1.expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
                            .to.emit(token, 'Transfer')
                            .withArgs(wallet.address, other.address, TEST_AMOUNT)];
                case 2:
                    _d.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, token.allowance(wallet.address, other.address)];
                case 3:
                    _a.apply(void 0, [_d.sent()]).to.eq(constants_1.MaxUint256);
                    _b = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(wallet.address)];
                case 4:
                    _b.apply(void 0, [_d.sent()]).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT));
                    _c = chai_1.expect;
                    return [4 /*yield*/, token.balanceOf(other.address)];
                case 5:
                    _c.apply(void 0, [_d.sent()]).to.eq(TEST_AMOUNT);
                    return [2 /*return*/];
            }
        });
    }); });
    it('permit', function () { return __awaiter(_this, void 0, void 0, function () {
        var nonce, deadline, digest, _a, v, r, s, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, token.nonces(wallet.address)];
                case 1:
                    nonce = _d.sent();
                    deadline = constants_1.MaxUint256;
                    return [4 /*yield*/, utilities_1.getApprovalDigest(token, { owner: wallet.address, spender: other.address, value: TEST_AMOUNT }, nonce, deadline)];
                case 2:
                    digest = _d.sent();
                    _a = ethereumjs_util_1.ecsign(Buffer.from(digest.slice(2), 'hex'), Buffer.from(wallet.privateKey.slice(2), 'hex')), v = _a.v, r = _a.r, s = _a.s;
                    return [4 /*yield*/, chai_1.expect(token.permit(wallet.address, other.address, TEST_AMOUNT, deadline, v, utils_1.hexlify(r), utils_1.hexlify(s)))
                            .to.emit(token, 'Approval')
                            .withArgs(wallet.address, other.address, TEST_AMOUNT)];
                case 3:
                    _d.sent();
                    _b = chai_1.expect;
                    return [4 /*yield*/, token.allowance(wallet.address, other.address)];
                case 4:
                    _b.apply(void 0, [_d.sent()]).to.eq(TEST_AMOUNT);
                    _c = chai_1.expect;
                    return [4 /*yield*/, token.nonces(wallet.address)];
                case 5:
                    _c.apply(void 0, [_d.sent()]).to.eq(utils_1.bigNumberify(1));
                    return [2 /*return*/];
            }
        });
    }); });
});
