"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./src/auth/auth_routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send("Hello World");
});
// app.use('/api/v1/user', userRoute.router)
app.use('/api/v1/auth', auth_routes_1.default.router);
app.listen(port, () => console.log(`app listing on port ${port}`));
