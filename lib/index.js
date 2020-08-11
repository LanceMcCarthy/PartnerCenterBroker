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
const got_1 = __importDefault(require("got"));
const querystring_1 = __importDefault(require("querystring"));
const converters_1 = require("./converters");
// Partner Center API https://docs.microsoft.com/en-us/windows/uwp/monetize/create-and-manage-submissions-using-windows-store-services
// API endpoints https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions
class DevCenter {
    constructor(_tenantId, _clientId, _clientSecret) {
        if (_tenantId == null || _clientId == null || _clientSecret) {
            throw new Error("you must pass a valid Tenent ID, Client ID and Client Secret. See the documentation for more information.");
        }
        this.tenantId = _tenantId;
        this.clientId = _clientId;
        this.clientSecret = _clientSecret;
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-app-data
    GetAppInfo(appId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}"`;
                const response = yield this.apiRequest(requestUrl, 'get');
                if (response.statusCode == 200) {
                    return converters_1.Convert.toAppInfoResult(response.body);
                }
                else if (response.statusCode === 400) {
                    throw console.error('400 - The request parameters are invalid.');
                }
                else if (response.statusCode === 404) {
                    throw console.error('404 - The specified submission could not be found.');
                }
                else if (response.statusCode === 409) {
                    throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                }
                else {
                    throw console.error(response.statusMessage);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/create-an-app-submission
    CreateAppSubmission(appId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions"`;
                const response = yield this.apiRequest(requestUrl, 'post');
                if (response.statusCode == 200) {
                    return converters_1.Convert.toCreateAppSubmissionResult(response.body);
                }
                else if (response.statusCode === 400) {
                    throw console.error('400 - The request parameters are invalid.');
                }
                else if (response.statusCode === 404) {
                    throw console.error('404 - The specified submission could not be found.');
                }
                else if (response.statusCode === 409) {
                    throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                }
                else {
                    throw console.error(response.statusMessage);
                }
            }
            catch (err) {
                throw console.error(err);
            }
        });
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/commit-an-app-submission
    CommitSubmission(appId, submissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}/commit"`;
                const response = yield this.apiRequest(requestUrl, 'post');
                if (response.statusCode == 200) {
                    return converters_1.Convert.toCommitSubmissionResult(response.body);
                }
                else if (response.statusCode === 400) {
                    throw console.error('400 - The request parameters are invalid.');
                }
                else if (response.statusCode === 404) {
                    throw console.error('404 - The specified submission could not be found.');
                }
                else if (response.statusCode === 409) {
                    throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                }
                else {
                    throw console.error(response.statusMessage);
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-an-app-submission
    GetSubmission(appId, submissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}"`;
                const response = yield this.apiRequest(requestUrl, 'post');
                if (response.statusCode == 200) {
                    return converters_1.Convert.toGetSubmissionResult(response.body);
                }
                else if (response.statusCode === 400) {
                    throw console.error('400 - The request parameters are invalid.');
                }
                else if (response.statusCode === 404) {
                    throw console.error('404 - The specified submission could not be found.');
                }
                else if (response.statusCode === 409) {
                    throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                }
                else {
                    throw console.error(response.statusMessage);
                }
            }
            catch (err) {
                throw console.error(err);
            }
        });
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-status-for-an-app-submission
    GetSubmissionStatus(appId, submissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}/status"`;
                const response = yield this.apiRequest(requestUrl, 'get');
                if (response.statusCode == 200) {
                    return converters_1.Convert.toSubmissionStatusResult(response.body);
                }
                else if (response.statusCode === 400) {
                    throw console.error('400 - The request parameters are invalid.');
                }
                else if (response.statusCode === 404) {
                    throw console.error('404 - The specified submission could not be found.');
                }
                else if (response.statusCode === 409) {
                    throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                }
                else {
                    throw console.error(response.statusMessage);
                }
            }
            catch (err) {
                throw console.error(err);
            }
        });
    }
    DeleteSubmission(appId, submissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}"`;
                const response = yield this.apiRequest(requestUrl, 'post');
                if (response.statusCode == 200) {
                    return true;
                }
                else if (response.statusCode === 400) {
                    throw console.error('400 - The request parameters are invalid.');
                }
                else if (response.statusCode === 404) {
                    throw console.error('404 - The specified submission could not be found.');
                }
                else if (response.statusCode === 409) {
                    throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                }
                else {
                    return false;
                }
            }
            catch (err) {
                throw console.error(err);
            }
        });
    }
    apiRequest(url, httpRequestMethod) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let needsNewToken = false;
                if (this.authResult == undefined) {
                    // First time authentication.
                    needsNewToken = true;
                }
                else if (Number(this.authResult.expires_on) < new Date('1970-01-01T0:0:0Z').getSeconds()) {
                    // If the previous authentication has expired.
                    needsNewToken = true;
                }
                if (needsNewToken) {
                    this.authResult = yield this.signin();
                    // To future-proof this, instead of hard coding the token type to "Bearer", I am appending the expected type
                    //const authHeader = `"${authResult.token_type} ${authResult.access_token}"`;
                    //options.headers.authorization = authHeader;
                }
                if (this.authResult == null) {
                    throw new Error("You could not be authenticated, double check the TenantID, ClientID and ClientSecret. See readme for more info.");
                }
                return yield got_1.default(url, {
                    method: httpRequestMethod,
                    headers: {
                        'Authorization': `"${this.authResult.token_type} ${this.authResult.access_token}"`
                    }
                });
            }
            catch (ex) {
                try {
                    if (ex.statusCode === 401) {
                        // If we got a 401 during a call, we need to get a new token anyways.
                        this.authResult = yield this.signin();
                        if (this.authResult == null) {
                            throw new Error("You could not be authenticated, double check the TenantID, ClientID and ClientSecret. See readme for more info.");
                        }
                        return yield got_1.default(url, {
                            method: httpRequestMethod,
                            headers: {
                                'Authorization': `"${this.authResult.token_type} ${this.authResult.access_token}"`
                            }
                        });
                    }
                    else if (ex.statusCode === 400) {
                        throw console.error('400 - The request parameters are invalid.');
                    }
                    else if (ex.statusCode === 404) {
                        throw console.error('404 - The specified submission could not be found.');
                    }
                    else if (ex.statusCode === 409) {
                        throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                    }
                    else {
                        throw console.error(ex.statusMessage);
                    }
                }
                catch (ex) {
                    throw ex;
                }
            }
        });
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/create-and-manage-submissions-using-windows-store-services
    signin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rootUrl = `"https://login.microsoftonline.com/${this.tenantId}/oauth2/token HTTP/1.1`;
                let response = yield got_1.default(rootUrl, {
                    method: 'post',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    body: querystring_1.default.stringify({
                        grant_type: 'client_credentials',
                        resource: 'https://manage.devcenter.microsoft.com',
                        client_id: this.clientId,
                        client_secret: this.clientSecret
                    })
                });
                if (response.statusCode == 200) {
                    return converters_1.Convert.toServiceAuthenticationResult(response.body);
                }
                else if (response.statusCode === 400) {
                    throw console.error('400 - The request parameters are invalid.');
                }
                else if (response.statusCode === 404) {
                    throw console.error('404 - The specified submission could not be found.');
                }
                else if (response.statusCode === 409) {
                    throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                }
                else {
                    throw console.error(response.statusMessage);
                }
            }
            catch (err) {
                throw console.error(err);
            }
        });
    }
}
module.exports = DevCenter;
