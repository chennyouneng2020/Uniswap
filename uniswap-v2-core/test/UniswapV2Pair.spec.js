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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importStar(require("chai"));
var ethereum_waffle_1 = require("ethereum-waffle");
var utils_1 = require("ethers/utils");
var utilities_1 = require("./shared/utilities");
var fixtures_1 = require("./shared/fixtures");
var constants_1 = require("ethers/constants");
var MINIMUM_LIQUIDITY = utils_1.bigNumberify(10).pow(3);
chai_1.default.use(ethereum_waffle_1.solidity);
var overrides = {
    gasLimit: 9999999
};
describe('UniswapV2Pair', function () {
    var provider = new ethereum_waffle_1.MockProvider({
        hardfork: 'istanbul',
        mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
        gasLimit: 9999999
    });
    var _a = provider.getWallets(), wallet = _a[0], other = _a[1];
    var loadFixture = ethereum_waffle_1.createFixtureLoader(provider, [wallet]);
    var factory;
    var token0;
    var token1;
    var pair;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var fixture;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadFixture(fixtures_1.pairFixture)];
                case 1:
                    fixture = _a.sent();
                    factory = fixture.factory;
                    token0 = fixture.token0;
                    token1 = fixture.token1;
                    pair = fixture.pair;
                    return [2 /*return*/];
            }
        });
    }); });
    it('mint', function () { return __awaiter(_this, void 0, void 0, function () {
        var token0Amount, token1Amount, expectedLiquidity, _a, _b, _c, _d, reserves;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    token0Amount = utilities_1.expandTo18Decimals(1);
                    token1Amount = utilities_1.expandTo18Decimals(4);
                    return [4 /*yield*/, token0.transfer(pair.address, token0Amount)];
                case 1:
                    _e.sent();
                    return [4 /*yield*/, token1.transfer(pair.address, token1Amount)];
                case 2:
                    _e.sent();
                    expectedLiquidity = utilities_1.expandTo18Decimals(2);
                    return [4 /*yield*/, chai_1.expect(pair.mint(wallet.address, overrides))
                            .to.emit(pair, 'Transfer')
                            .withArgs(constants_1.AddressZero, constants_1.AddressZero, MINIMUM_LIQUIDITY)
                            .to.emit(pair, 'Transfer')
                            .withArgs(constants_1.AddressZero, wallet.address, expectedLiquidity.sub(MINIMUM_LIQUIDITY))
                            .to.emit(pair, 'Sync')
                            .withArgs(token0Amount, token1Amount)
                            .to.emit(pair, 'Mint')
                            .withArgs(wallet.address, token0Amount, token1Amount)];
                case 3:
                    _e.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, pair.totalSupply()];
                case 4:
                    _a.apply(void 0, [_e.sent()]).to.eq(expectedLiquidity);
                    _b = chai_1.expect;
                    return [4 /*yield*/, pair.balanceOf(wallet.address)];
                case 5:
                    _b.apply(void 0, [_e.sent()]).to.eq(expectedLiquidity.sub(MINIMUM_LIQUIDITY));
                    _c = chai_1.expect;
                    return [4 /*yield*/, token0.balanceOf(pair.address)];
                case 6:
                    _c.apply(void 0, [_e.sent()]).to.eq(token0Amount);
                    _d = chai_1.expect;
                    return [4 /*yield*/, token1.balanceOf(pair.address)];
                case 7:
                    _d.apply(void 0, [_e.sent()]).to.eq(token1Amount);
                    return [4 /*yield*/, pair.getReserves()];
                case 8:
                    reserves = _e.sent();
                    chai_1.expect(reserves[0]).to.eq(token0Amount);
                    chai_1.expect(reserves[1]).to.eq(token1Amount);
                    return [2 /*return*/];
            }
        });
    }); });
    function addLiquidity(token0Amount, token1Amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, token0.transfer(pair.address, token0Amount)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, token1.transfer(pair.address, token1Amount)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, pair.mint(wallet.address, overrides)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var swapTestCases = [
        [1, 5, 10, '1662497915624478906'],
        [1, 10, 5, '453305446940074565'],
        [2, 5, 10, '2851015155847869602'],
        [2, 10, 5, '831248957812239453'],
        [1, 10, 10, '906610893880149131'],
        [1, 100, 100, '987158034397061298'],
        [1, 1000, 1000, '996006981039903216']
    ].map(function (a) { return a.map(function (n) { return (typeof n === 'string' ? utils_1.bigNumberify(n) : utilities_1.expandTo18Decimals(n)); }); });
    swapTestCases.forEach(function (swapTestCase, i) {
        it("getInputPrice:" + i, function () { return __awaiter(_this, void 0, void 0, function () {
            var swapAmount, token0Amount, token1Amount, expectedOutputAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        swapAmount = swapTestCase[0], token0Amount = swapTestCase[1], token1Amount = swapTestCase[2], expectedOutputAmount = swapTestCase[3];
                        return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, token0.transfer(pair.address, swapAmount)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, chai_1.expect(pair.swap(0, expectedOutputAmount.add(1), wallet.address, '0x', overrides)).to.be.revertedWith('UniswapV2: K')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, pair.swap(0, expectedOutputAmount, wallet.address, '0x', overrides)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    var optimisticTestCases = [
        ['997000000000000000', 5, 10, 1],
        ['997000000000000000', 10, 5, 1],
        ['997000000000000000', 5, 5, 1],
        [1, 5, 5, '1003009027081243732'] // given amountOut, amountIn = ceiling(amountOut / .997)
    ].map(function (a) { return a.map(function (n) { return (typeof n === 'string' ? utils_1.bigNumberify(n) : utilities_1.expandTo18Decimals(n)); }); });
    optimisticTestCases.forEach(function (optimisticTestCase, i) {
        it("optimistic:" + i, function () { return __awaiter(_this, void 0, void 0, function () {
            var outputAmount, token0Amount, token1Amount, inputAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        outputAmount = optimisticTestCase[0], token0Amount = optimisticTestCase[1], token1Amount = optimisticTestCase[2], inputAmount = optimisticTestCase[3];
                        return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, token0.transfer(pair.address, inputAmount)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, chai_1.expect(pair.swap(outputAmount.add(1), 0, wallet.address, '0x', overrides)).to.be.revertedWith('UniswapV2: K')];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, pair.swap(outputAmount, 0, wallet.address, '0x', overrides)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    it('swap:token0', function () { return __awaiter(_this, void 0, void 0, function () {
        var token0Amount, token1Amount, swapAmount, expectedOutputAmount, reserves, _a, _b, totalSupplyToken0, totalSupplyToken1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    token0Amount = utilities_1.expandTo18Decimals(5);
                    token1Amount = utilities_1.expandTo18Decimals(10);
                    return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)];
                case 1:
                    _e.sent();
                    swapAmount = utilities_1.expandTo18Decimals(1);
                    expectedOutputAmount = utils_1.bigNumberify('1662497915624478906');
                    return [4 /*yield*/, token0.transfer(pair.address, swapAmount)];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, chai_1.expect(pair.swap(0, expectedOutputAmount, wallet.address, '0x', overrides))
                            .to.emit(token1, 'Transfer')
                            .withArgs(pair.address, wallet.address, expectedOutputAmount)
                            .to.emit(pair, 'Sync')
                            .withArgs(token0Amount.add(swapAmount), token1Amount.sub(expectedOutputAmount))
                            .to.emit(pair, 'Swap')
                            .withArgs(wallet.address, swapAmount, 0, 0, expectedOutputAmount, wallet.address)];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, pair.getReserves()];
                case 4:
                    reserves = _e.sent();
                    chai_1.expect(reserves[0]).to.eq(token0Amount.add(swapAmount));
                    chai_1.expect(reserves[1]).to.eq(token1Amount.sub(expectedOutputAmount));
                    _a = chai_1.expect;
                    return [4 /*yield*/, token0.balanceOf(pair.address)];
                case 5:
                    _a.apply(void 0, [_e.sent()]).to.eq(token0Amount.add(swapAmount));
                    _b = chai_1.expect;
                    return [4 /*yield*/, token1.balanceOf(pair.address)];
                case 6:
                    _b.apply(void 0, [_e.sent()]).to.eq(token1Amount.sub(expectedOutputAmount));
                    return [4 /*yield*/, token0.totalSupply()];
                case 7:
                    totalSupplyToken0 = _e.sent();
                    return [4 /*yield*/, token1.totalSupply()];
                case 8:
                    totalSupplyToken1 = _e.sent();
                    _c = chai_1.expect;
                    return [4 /*yield*/, token0.balanceOf(wallet.address)];
                case 9:
                    _c.apply(void 0, [_e.sent()]).to.eq(totalSupplyToken0.sub(token0Amount).sub(swapAmount));
                    _d = chai_1.expect;
                    return [4 /*yield*/, token1.balanceOf(wallet.address)];
                case 10:
                    _d.apply(void 0, [_e.sent()]).to.eq(totalSupplyToken1.sub(token1Amount).add(expectedOutputAmount));
                    return [2 /*return*/];
            }
        });
    }); });
    it('swap:token1', function () { return __awaiter(_this, void 0, void 0, function () {
        var token0Amount, token1Amount, swapAmount, expectedOutputAmount, reserves, _a, _b, totalSupplyToken0, totalSupplyToken1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    token0Amount = utilities_1.expandTo18Decimals(5);
                    token1Amount = utilities_1.expandTo18Decimals(10);
                    return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)];
                case 1:
                    _e.sent();
                    swapAmount = utilities_1.expandTo18Decimals(1);
                    expectedOutputAmount = utils_1.bigNumberify('453305446940074565');
                    return [4 /*yield*/, token1.transfer(pair.address, swapAmount)];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, chai_1.expect(pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides))
                            .to.emit(token0, 'Transfer')
                            .withArgs(pair.address, wallet.address, expectedOutputAmount)
                            .to.emit(pair, 'Sync')
                            .withArgs(token0Amount.sub(expectedOutputAmount), token1Amount.add(swapAmount))
                            .to.emit(pair, 'Swap')
                            .withArgs(wallet.address, 0, swapAmount, expectedOutputAmount, 0, wallet.address)];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, pair.getReserves()];
                case 4:
                    reserves = _e.sent();
                    chai_1.expect(reserves[0]).to.eq(token0Amount.sub(expectedOutputAmount));
                    chai_1.expect(reserves[1]).to.eq(token1Amount.add(swapAmount));
                    _a = chai_1.expect;
                    return [4 /*yield*/, token0.balanceOf(pair.address)];
                case 5:
                    _a.apply(void 0, [_e.sent()]).to.eq(token0Amount.sub(expectedOutputAmount));
                    _b = chai_1.expect;
                    return [4 /*yield*/, token1.balanceOf(pair.address)];
                case 6:
                    _b.apply(void 0, [_e.sent()]).to.eq(token1Amount.add(swapAmount));
                    return [4 /*yield*/, token0.totalSupply()];
                case 7:
                    totalSupplyToken0 = _e.sent();
                    return [4 /*yield*/, token1.totalSupply()];
                case 8:
                    totalSupplyToken1 = _e.sent();
                    _c = chai_1.expect;
                    return [4 /*yield*/, token0.balanceOf(wallet.address)];
                case 9:
                    _c.apply(void 0, [_e.sent()]).to.eq(totalSupplyToken0.sub(token0Amount).add(expectedOutputAmount));
                    _d = chai_1.expect;
                    return [4 /*yield*/, token1.balanceOf(wallet.address)];
                case 10:
                    _d.apply(void 0, [_e.sent()]).to.eq(totalSupplyToken1.sub(token1Amount).sub(swapAmount));
                    return [2 /*return*/];
            }
        });
    }); });
    it('swap:gas', function () { return __awaiter(_this, void 0, void 0, function () {
        var token0Amount, token1Amount, _a, _b, swapAmount, expectedOutputAmount, _c, _d, tx, receipt;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    token0Amount = utilities_1.expandTo18Decimals(5);
                    token1Amount = utilities_1.expandTo18Decimals(10);
                    return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)
                        // ensure that setting price{0,1}CumulativeLast for the first time doesn't affect our gas math
                    ];
                case 1:
                    _e.sent();
                    _a = utilities_1.mineBlock;
                    _b = [provider];
                    return [4 /*yield*/, provider.getBlock('latest')];
                case 2: 
                // ensure that setting price{0,1}CumulativeLast for the first time doesn't affect our gas math
                return [4 /*yield*/, _a.apply(void 0, _b.concat([(_e.sent()).timestamp + 1]))];
                case 3:
                    // ensure that setting price{0,1}CumulativeLast for the first time doesn't affect our gas math
                    _e.sent();
                    return [4 /*yield*/, pair.sync(overrides)];
                case 4:
                    _e.sent();
                    swapAmount = utilities_1.expandTo18Decimals(1);
                    expectedOutputAmount = utils_1.bigNumberify('453305446940074565');
                    return [4 /*yield*/, token1.transfer(pair.address, swapAmount)];
                case 5:
                    _e.sent();
                    _c = utilities_1.mineBlock;
                    _d = [provider];
                    return [4 /*yield*/, provider.getBlock('latest')];
                case 6: return [4 /*yield*/, _c.apply(void 0, _d.concat([(_e.sent()).timestamp + 1]))];
                case 7:
                    _e.sent();
                    return [4 /*yield*/, pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)];
                case 8:
                    tx = _e.sent();
                    return [4 /*yield*/, tx.wait()];
                case 9:
                    receipt = _e.sent();
                    chai_1.expect(receipt.gasUsed).to.eq(73462);
                    return [2 /*return*/];
            }
        });
    }); });
    it('burn', function () { return __awaiter(_this, void 0, void 0, function () {
        var token0Amount, token1Amount, expectedLiquidity, _a, _b, _c, _d, totalSupplyToken0, totalSupplyToken1, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    token0Amount = utilities_1.expandTo18Decimals(3);
                    token1Amount = utilities_1.expandTo18Decimals(3);
                    return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)];
                case 1:
                    _g.sent();
                    expectedLiquidity = utilities_1.expandTo18Decimals(3);
                    return [4 /*yield*/, pair.transfer(pair.address, expectedLiquidity.sub(MINIMUM_LIQUIDITY))];
                case 2:
                    _g.sent();
                    return [4 /*yield*/, chai_1.expect(pair.burn(wallet.address, overrides))
                            .to.emit(pair, 'Transfer')
                            .withArgs(pair.address, constants_1.AddressZero, expectedLiquidity.sub(MINIMUM_LIQUIDITY))
                            .to.emit(token0, 'Transfer')
                            .withArgs(pair.address, wallet.address, token0Amount.sub(1000))
                            .to.emit(token1, 'Transfer')
                            .withArgs(pair.address, wallet.address, token1Amount.sub(1000))
                            .to.emit(pair, 'Sync')
                            .withArgs(1000, 1000)
                            .to.emit(pair, 'Burn')
                            .withArgs(wallet.address, token0Amount.sub(1000), token1Amount.sub(1000), wallet.address)];
                case 3:
                    _g.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, pair.balanceOf(wallet.address)];
                case 4:
                    _a.apply(void 0, [_g.sent()]).to.eq(0);
                    _b = chai_1.expect;
                    return [4 /*yield*/, pair.totalSupply()];
                case 5:
                    _b.apply(void 0, [_g.sent()]).to.eq(MINIMUM_LIQUIDITY);
                    _c = chai_1.expect;
                    return [4 /*yield*/, token0.balanceOf(pair.address)];
                case 6:
                    _c.apply(void 0, [_g.sent()]).to.eq(1000);
                    _d = chai_1.expect;
                    return [4 /*yield*/, token1.balanceOf(pair.address)];
                case 7:
                    _d.apply(void 0, [_g.sent()]).to.eq(1000);
                    return [4 /*yield*/, token0.totalSupply()];
                case 8:
                    totalSupplyToken0 = _g.sent();
                    return [4 /*yield*/, token1.totalSupply()];
                case 9:
                    totalSupplyToken1 = _g.sent();
                    _e = chai_1.expect;
                    return [4 /*yield*/, token0.balanceOf(wallet.address)];
                case 10:
                    _e.apply(void 0, [_g.sent()]).to.eq(totalSupplyToken0.sub(1000));
                    _f = chai_1.expect;
                    return [4 /*yield*/, token1.balanceOf(wallet.address)];
                case 11:
                    _f.apply(void 0, [_g.sent()]).to.eq(totalSupplyToken1.sub(1000));
                    return [2 /*return*/];
            }
        });
    }); });
    it('price{0,1}CumulativeLast', function () { return __awaiter(_this, void 0, void 0, function () {
        var token0Amount, token1Amount, blockTimestamp, initialPrice, _a, _b, _c, swapAmount, _d, _e, _f, newPrice, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    token0Amount = utilities_1.expandTo18Decimals(3);
                    token1Amount = utilities_1.expandTo18Decimals(3);
                    return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)];
                case 1:
                    _k.sent();
                    return [4 /*yield*/, pair.getReserves()];
                case 2:
                    blockTimestamp = (_k.sent())[2];
                    return [4 /*yield*/, utilities_1.mineBlock(provider, blockTimestamp + 1)];
                case 3:
                    _k.sent();
                    return [4 /*yield*/, pair.sync(overrides)];
                case 4:
                    _k.sent();
                    initialPrice = utilities_1.encodePrice(token0Amount, token1Amount);
                    _a = chai_1.expect;
                    return [4 /*yield*/, pair.price0CumulativeLast()];
                case 5:
                    _a.apply(void 0, [_k.sent()]).to.eq(initialPrice[0]);
                    _b = chai_1.expect;
                    return [4 /*yield*/, pair.price1CumulativeLast()];
                case 6:
                    _b.apply(void 0, [_k.sent()]).to.eq(initialPrice[1]);
                    _c = chai_1.expect;
                    return [4 /*yield*/, pair.getReserves()];
                case 7:
                    _c.apply(void 0, [(_k.sent())[2]]).to.eq(blockTimestamp + 1);
                    swapAmount = utilities_1.expandTo18Decimals(3);
                    return [4 /*yield*/, token0.transfer(pair.address, swapAmount)];
                case 8:
                    _k.sent();
                    return [4 /*yield*/, utilities_1.mineBlock(provider, blockTimestamp + 10)
                        // swap to a new price eagerly instead of syncing
                    ];
                case 9:
                    _k.sent();
                    // swap to a new price eagerly instead of syncing
                    return [4 /*yield*/, pair.swap(0, utilities_1.expandTo18Decimals(1), wallet.address, '0x', overrides)]; // make the price nice
                case 10:
                    // swap to a new price eagerly instead of syncing
                    _k.sent(); // make the price nice
                    _d = chai_1.expect;
                    return [4 /*yield*/, pair.price0CumulativeLast()];
                case 11:
                    _d.apply(void 0, [_k.sent()]).to.eq(initialPrice[0].mul(10));
                    _e = chai_1.expect;
                    return [4 /*yield*/, pair.price1CumulativeLast()];
                case 12:
                    _e.apply(void 0, [_k.sent()]).to.eq(initialPrice[1].mul(10));
                    _f = chai_1.expect;
                    return [4 /*yield*/, pair.getReserves()];
                case 13:
                    _f.apply(void 0, [(_k.sent())[2]]).to.eq(blockTimestamp + 10);
                    return [4 /*yield*/, utilities_1.mineBlock(provider, blockTimestamp + 20)];
                case 14:
                    _k.sent();
                    return [4 /*yield*/, pair.sync(overrides)];
                case 15:
                    _k.sent();
                    newPrice = utilities_1.encodePrice(utilities_1.expandTo18Decimals(6), utilities_1.expandTo18Decimals(2));
                    _g = chai_1.expect;
                    return [4 /*yield*/, pair.price0CumulativeLast()];
                case 16:
                    _g.apply(void 0, [_k.sent()]).to.eq(initialPrice[0].mul(10).add(newPrice[0].mul(10)));
                    _h = chai_1.expect;
                    return [4 /*yield*/, pair.price1CumulativeLast()];
                case 17:
                    _h.apply(void 0, [_k.sent()]).to.eq(initialPrice[1].mul(10).add(newPrice[1].mul(10)));
                    _j = chai_1.expect;
                    return [4 /*yield*/, pair.getReserves()];
                case 18:
                    _j.apply(void 0, [(_k.sent())[2]]).to.eq(blockTimestamp + 20);
                    return [2 /*return*/];
            }
        });
    }); });
    it('feeTo:off', function () { return __awaiter(_this, void 0, void 0, function () {
        var token0Amount, token1Amount, swapAmount, expectedOutputAmount, expectedLiquidity, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token0Amount = utilities_1.expandTo18Decimals(1000);
                    token1Amount = utilities_1.expandTo18Decimals(1000);
                    return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)];
                case 1:
                    _b.sent();
                    swapAmount = utilities_1.expandTo18Decimals(1);
                    expectedOutputAmount = utils_1.bigNumberify('996006981039903216');
                    return [4 /*yield*/, token1.transfer(pair.address, swapAmount)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)];
                case 3:
                    _b.sent();
                    expectedLiquidity = utilities_1.expandTo18Decimals(1000);
                    return [4 /*yield*/, pair.transfer(pair.address, expectedLiquidity.sub(MINIMUM_LIQUIDITY))];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, pair.burn(wallet.address, overrides)];
                case 5:
                    _b.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, pair.totalSupply()];
                case 6:
                    _a.apply(void 0, [_b.sent()]).to.eq(MINIMUM_LIQUIDITY);
                    return [2 /*return*/];
            }
        });
    }); });
    it('feeTo:on', function () { return __awaiter(_this, void 0, void 0, function () {
        var token0Amount, token1Amount, swapAmount, expectedOutputAmount, expectedLiquidity, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, factory.setFeeTo(other.address)];
                case 1:
                    _e.sent();
                    token0Amount = utilities_1.expandTo18Decimals(1000);
                    token1Amount = utilities_1.expandTo18Decimals(1000);
                    return [4 /*yield*/, addLiquidity(token0Amount, token1Amount)];
                case 2:
                    _e.sent();
                    swapAmount = utilities_1.expandTo18Decimals(1);
                    expectedOutputAmount = utils_1.bigNumberify('996006981039903216');
                    return [4 /*yield*/, token1.transfer(pair.address, swapAmount)];
                case 3:
                    _e.sent();
                    return [4 /*yield*/, pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)];
                case 4:
                    _e.sent();
                    expectedLiquidity = utilities_1.expandTo18Decimals(1000);
                    return [4 /*yield*/, pair.transfer(pair.address, expectedLiquidity.sub(MINIMUM_LIQUIDITY))];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, pair.burn(wallet.address, overrides)];
                case 6:
                    _e.sent();
                    _a = chai_1.expect;
                    return [4 /*yield*/, pair.totalSupply()];
                case 7:
                    _a.apply(void 0, [_e.sent()]).to.eq(MINIMUM_LIQUIDITY.add('249750499251388'));
                    _b = chai_1.expect;
                    return [4 /*yield*/, pair.balanceOf(other.address)];
                case 8:
                    _b.apply(void 0, [_e.sent()]).to.eq('249750499251388');
                    // using 1000 here instead of the symbolic MINIMUM_LIQUIDITY because the amounts only happen to be equal...
                    // ...because the initial liquidity amounts were equal
                    _c = chai_1.expect;
                    return [4 /*yield*/, token0.balanceOf(pair.address)];
                case 9:
                    // using 1000 here instead of the symbolic MINIMUM_LIQUIDITY because the amounts only happen to be equal...
                    // ...because the initial liquidity amounts were equal
                    _c.apply(void 0, [_e.sent()]).to.eq(utils_1.bigNumberify(1000).add('249501683697445'));
                    _d = chai_1.expect;
                    return [4 /*yield*/, token1.balanceOf(pair.address)];
                case 10:
                    _d.apply(void 0, [_e.sent()]).to.eq(utils_1.bigNumberify(1000).add('250000187312969'));
                    return [2 /*return*/];
            }
        });
    }); });
});
