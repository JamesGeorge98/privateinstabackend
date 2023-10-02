"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomRangedNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function sendApiResponse(res, apiResponse, statusCode = 200) {
    if (statusCode)
        res.status(statusCode);
    res.json(apiResponse);
}
exports.default = {
    getRandomRangedNumber, sendApiResponse
};
