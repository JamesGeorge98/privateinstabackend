import { ApiResponse } from "../base/models/base_response";
import { Response } from 'express';

function getRandomRangedNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sendApiResponse<T>(res: Response, apiResponse: ApiResponse<T>, statusCode: number = 200): void {
    if(statusCode)
    res.status(statusCode);
    res.json(apiResponse);
}

export default {
    getRandomRangedNumber, sendApiResponse
}