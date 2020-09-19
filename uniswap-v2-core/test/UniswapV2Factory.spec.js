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
var ethers_1 = require("ethers");
var constants_1 = require("ethers/constants");
var utils_1 = require("ethers/utils");
var ethereum_waffle_1 = require("ethereum-waffle");
var utilities_1 = require("./shared/utilities");
var fixtures_1 = require("./shared/fixtures");
var UniswapV2Pair_json_1 = __importDefault(require("../build/UniswapV2Pair.json"));
chai_1.default.use(ethereum_waffle_1.solidity);
var TEST_ADDRESSES = [
    '0x1000000000000000000000000000000000000000',
    '0x2000000000000000000000000000000000000000'
];
describe('UniswapV2Factory', function () {
    var provider = new ethereum_waffle_1.MockProvider({
        hardfork: 'istanbul',
        mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
        gasLimit: 9999999
    });
    var _a = provider.getWallets(), wallet = _a[0], other = _a[1];
    var loadFixture = ethereum_waffle_1.createFixtureLoader(provider, [wallet, other]);
    var factory;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var fixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadFixture(fixtures_1.factoryFixture)];
                case 1:
                    fixture = _a.sent();
                    factory = fixture.factory;
                    return [2 /*return*/];
            }
        });
    }); });
    it('feeTo, feeToSetter, allPairsLength', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = chai_1.expect;
                    return [4 /*yield*/, factory.feeTo()];
                case 1:
                    _a.apply(void 0, [_d.sent()]).to.eq(constants_1.AddressZero);
                    _b = chai_1.expect;
                    return [4 /*yield*/, factory.feeToSetter()];
                case 2:
                    _b.apply(void 0, [_d.sent()]).to.eq(wallet.address);
                    _c = chai_1.expect;
                    return [4 /*yield*/, factory.allPairsLength()];
                case 3:
                    _c.apply(void 0, [_d.sent()]).to.eq(0);
                    return [2 /*return*/];
            }
        });
    }); });
    function createPair(tokens) {
        return __awaiter(this, void 0, void 0, function () {
            var bytecode, create2Address, _a, _b, _c, _d, pair, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        bytecode = "0x" + UniswapV2Pair_json_1.default.evm.bytecode.object;
                        create2Address = utilities_1.getCreate2Address(factory.address, tokens, bytecode);
                        return [4 /*yield*/, chai_1.expect(factory.createPair.apply(factory, tokens))
                                .to.emit(factory, 'PairCreated')
                                .withArgs(TEST_ADDRESSES[0], TEST_ADDRESSES[1], create2Address, utils_1.bigNumberify(1))];
                    case 1:
                        _h.sent();
                        return [4 /*yield*/, chai_1.expect(factory.createPair.apply(factory, tokens)).to.be.reverted]; // UniswapV2: PAIR_EXISTS
                    case 2:
                        _h.sent(); // UniswapV2: PAIR_EXISTS
                        return [4 /*yield*/, chai_1.expect(factory.createPair.apply(factory, tokens.slice().reverse())).to.be.reverted]; // UniswapV2: PAIR_EXISTS
                    case 3:
                        _h.sent(); // UniswapV2: PAIR_EXISTS
                        _a = chai_1.expect;
                        return [4 /*yield*/, factory.getPair.apply(factory, tokens)];
                    case 4:
                        _a.apply(void 0, [_h.sent()]).to.eq(create2Address);
                        _b = chai_1.expect;
                        return [4 /*yield*/, factory.getPair.apply(factory, tokens.slice().reverse())];
                    case 5:
                        _b.apply(void 0, [_h.sent()]).to.eq(create2Address);
                        _c = chai_1.expect;
                        return [4 /*yield*/, factory.allPairs(0)];
                    case 6:
                        _c.apply(void 0, [_h.sent()]).to.eq(create2Address);
                        _d = chai_1.expect;
                        return [4 /*yield*/, factory.allPairsLength()];
                    case 7:
                        _d.apply(void 0, [_h.sent()]).to.eq(1);
                        pair = new ethers_1.Contract(create2Address, JSON.stringify(UniswapV2Pair_json_1.default.abi), provider);
                        _e = chai_1.expect;
                        return [4 /*yield*/, pair.factory()];
                    case 8:
                        _e.apply(void 0, [_h.sent()]).to.eq(factory.address);
                        _f = chai_1.expect;
                        return [4 /*yield*/, pair.token0()];
                    case 9:
                        _f.apply(void 0, [_h.sent()]).to.eq(TEST_ADDRESSES[0]);
                        _g = chai_1.expect;
                        return [4 /*yield*/, pair.token1()];
                    case 10:
                        _g.apply(void 0, [_h.sent()]).to.eq(TEST_ADDRESSES[1]);
                        return [2 /*return*/];
                }
            });
        });
    }
    it('createPair', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createPair(TEST_ADDRESSES)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('createPair:reverse', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createPair(TEST_ADDRESSES.slice().reverse())];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('createPair:gas', function () { return __awaiter(_this, void 0, void 0, function () {
        var tx, receipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, factory.createPair.apply(factory, TEST_ADDRESSES)];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 2:
                    receipt = _a.sent();
                    chai_1.expect(receipt.gasUsed).to.eq(2512920);
                    return [2 /*return*/];
            }
        });
    }); });
    it('setFeeTo', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, chai_1.expect(factory.connect(other).setFeeTo(other.address)).to.be.revertedWith('UniswapV2: FORBIDDEN')];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, factory.setFeeTo(wallet.address)];
                case 2:
                    _b.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, factory.feeTo()];
                case 3:
                    _a.apply(void 0, [_b.sent()]).to.eq(wallet.address);
                    return [2 /*return*/];
            }
        });
    }); });
    it('setFeeToSetter', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, chai_1.expect(factory.connect(other).setFeeToSetter(other.address)).to.be.revertedWith('UniswapV2: FORBIDDEN')];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, factory.setFeeToSetter(other.address)];
                case 2:
                    _b.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, factory.feeToSetter()];
                case 3:
                    _a.apply(void 0, [_b.sent()]).to.eq(other.address);
                    return [4 /*yield*/, chai_1.expect(factory.setFeeToSetter(wallet.address)).to.be.revertedWith('UniswapV2: FORBIDDEN')];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
