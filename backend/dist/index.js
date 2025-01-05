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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const client = (0, redis_1.createClient)().on("error", (err) => console.log("Redis Client Error", err));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect().then(() => console.log("redis successfuly connected"));
    });
}
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "bye",
    });
});
app.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.lPush("testing", JSON.stringify({ name: "testing", time: "50" }));
    return res.status(200).json({
        message: "route pe ho",
    });
}));
app.listen(port, () => {
    main();
    console.log(`server start hogaya`);
});
