"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
class Convert {
    static toGetSubmissionResult(json) {
        return JSON.parse(json);
    }
    static getSubmissionResultToJson(value) {
        return JSON.stringify(value);
    }
    static toServiceAuthenticationResult(json) {
        return JSON.parse(json);
    }
    static serviceAuthenticationResultToJson(value) {
        return JSON.stringify(value);
    }
    static toSubmissionStatusResult(json) {
        return JSON.parse(json);
    }
    static submissionStatusResultToJson(value) {
        return JSON.stringify(value);
    }
    static toCommitSubmissionResult(json) {
        return JSON.parse(json);
    }
    static commitSubmissionResultToJson(value) {
        return JSON.stringify(value);
    }
    static toCreateAppSubmissionResult(json) {
        return JSON.parse(json);
    }
    static createAppSubmissionResultToJson(value) {
        return JSON.stringify(value);
    }
    static toAppInfoResult(json) {
        return JSON.parse(json);
    }
    static appInfoResultToJson(value) {
        return JSON.stringify(value);
    }
    static toFlightResourceResult(json) {
        return JSON.parse(json);
    }
    static flightResourceResultToJson(value) {
        return JSON.stringify(value);
    }
}
exports.Convert = Convert;
