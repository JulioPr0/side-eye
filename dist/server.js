"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var typeorm_1 = require("typeorm");
var Item_1 = require("./entity/Item");
(0, typeorm_1.createConnection)().then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var app, itemRepository;
    return __generator(this, function (_a) {
        app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        itemRepository = connection.getRepository(Item_1.Item);
        // Create
        app.post("/items", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var item, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item = itemRepository.create(req.body);
                        return [4 /*yield*/, itemRepository.save(item)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        }); });
        // Read all
        app.get("/items", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, itemRepository.find()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, res.json(items)];
                }
            });
        }); });
        // Read one
        app.get("/items/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var itemId, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = parseInt(req.params.id);
                        return [4 /*yield*/, itemRepository.findOne({ where: { id: itemId } })];
                    case 1:
                        item = _a.sent();
                        if (item)
                            return [2 /*return*/, res.json(item)];
                        return [2 /*return*/, res.status(404).send("Item not found")];
                }
            });
        }); });
        // Update
        app.put("/items/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var itemId, item, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = parseInt(req.params.id);
                        return [4 /*yield*/, itemRepository.findOne({ where: { id: itemId } })];
                    case 1:
                        item = _a.sent();
                        if (!item) return [3 /*break*/, 3];
                        itemRepository.merge(item, req.body);
                        return [4 /*yield*/, itemRepository.save(item)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                    case 3: return [2 /*return*/, res.status(404).send("Item not found")];
                }
            });
        }); });
        // Delete
        app.delete("/items/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
            var itemId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = parseInt(req.params.id);
                        return [4 /*yield*/, itemRepository.delete(itemId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, res.send(result)];
                }
            });
        }); });
        app.listen(3000, function () {
            console.log("Server started on port 3000");
        });
        return [2 /*return*/];
    });
}); }).catch(function (error) { return console.log(error); });
