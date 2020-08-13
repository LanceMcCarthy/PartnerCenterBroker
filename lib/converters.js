"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
class Convert {
    // JSON to type
    static toServiceAuthenticationResult(json) {
        return JSON.parse(json);
    }
    static toAppInfoResult(json) {
        return JSON.parse(json);
    }
    static toCreateAppSubmissionResult(json) {
        return JSON.parse(json);
    }
    static toUpdateSubmissionResult(json) {
        return JSON.parse(json);
    }
    static toCommitSubmissionResult(json) {
        return JSON.parse(json);
    }
    static toGetSubmissionResult(json) {
        return JSON.parse(json);
    }
    static toSubmissionStatusResult(json) {
        return JSON.parse(json);
    }
    static toSubmissionData(json) {
        return JSON.parse(json);
    }
    static toFlightResourceResult(json) {
        return JSON.parse(json);
    }
    // Type to JSON
    static serviceAuthenticationResultToJson(value) {
        return JSON.stringify(value);
    }
    static appInfoResultToJson(value) {
        return JSON.stringify(value);
    }
    static createAppSubmissionResultToJson(value) {
        return JSON.stringify(value);
    }
    static submissionDataToJson(value) {
        return JSON.stringify(value);
    }
    static updateSubmissionResultToJson(value) {
        return JSON.stringify(value);
    }
    static commitSubmissionResultToJson(value) {
        return JSON.stringify(value);
    }
    static getSubmissionResultToJson(value) {
        return JSON.stringify(value);
    }
    static submissionStatusResultToJson(value) {
        return JSON.stringify(value);
    }
    static flightResourceResultToJson(value) {
        return JSON.stringify(value);
    }
}
exports.Convert = Convert;
