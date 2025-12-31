"use strict";
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
        if (typeof _tenantId != 'undefined' && !_tenantId) {
            throw new Error('You must pass a valid Tenant ID. See the documentation for examples and guidance https://lancemccarthy.github.io/PartnerCenterBroker/.');
        }
        if (typeof _clientId != 'undefined' && !_clientId) {
            throw new Error('You must pass a valid Client ID. See the documentation for examples and guidance https://lancemccarthy.github.io/PartnerCenterBroker/.');
        }
        if (typeof _clientSecret != 'undefined' && !_clientSecret) {
            throw new Error('You must pass a valid Client Secret. See the documentation for examples and guidance https://lancemccarthy.github.io/PartnerCenterBroker/.');
        }
        this.tenantId = _tenantId;
        this.clientId = _clientId;
        this.clientSecret = _clientSecret;
    }
    async GetAppInfo(appId) {
        try {
            let auth = await this.authorize();
            // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-app-data
            const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}"`;
            const response = await (0, got_1.default)(requestUrl, {
                method: 'get',
                headers: {
                    Authorization: `"${auth.token_type} ${auth.access_token}"`
                }
            });
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
    }
    async CreateAppSubmission(appId) {
        try {
            let auth = await this.authorize();
            // https://docs.microsoft.com/en-us/windows/uwp/monetize/create-an-app-submission
            const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions"`;
            const response = await (0, got_1.default)(requestUrl, {
                method: 'post',
                headers: {
                    Authorization: `"${auth.token_type} ${auth.access_token}"`,
                    ContentType: 'application/json'
                }
            });
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
    }
    async UpdateSubmission(appId, submissionId, data) {
        try {
            let auth = await this.authorize();
            // Special Note: carefully read Request Body section in the documentation
            // https://docs.microsoft.com/en-us/windows/uwp/monetize/update-an-app-submission
            const requestUrl = 'https://manage.devcenter.microsoft.com/v1.0/my/applications/{applicationId}/submissions/{submissionId}';
            const response = await (0, got_1.default)(requestUrl, {
                method: 'post',
                headers: {
                    Authorization: `"${auth.token_type} ${auth.access_token}"`,
                    ContentType: 'application/json'
                },
                body: converters_1.Convert.submissionDataToJson(data)
            });
            if (response.statusCode == 200) {
                return converters_1.Convert.toUpdateSubmissionResult(response.body);
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
    }
    async CommitSubmission(appId, submissionId) {
        try {
            let auth = await this.authorize();
            // https://docs.microsoft.com/en-us/windows/uwp/monetize/commit-an-app-submission
            const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}/commit"`;
            const response = await (0, got_1.default)(requestUrl, {
                method: 'post',
                headers: {
                    Authorization: `"${auth.token_type} ${auth.access_token}"`
                }
            });
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
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-an-app-submission
    async GetSubmission(appId, submissionId) {
        try {
            let auth = await this.authorize();
            const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}"`;
            const response = await (0, got_1.default)(requestUrl, {
                method: 'post',
                headers: {
                    Authorization: `"${auth.token_type} ${auth.access_token}"`
                }
            });
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
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-status-for-an-app-submission
    async GetSubmissionStatus(appId, submissionId) {
        try {
            let auth = await this.authorize();
            const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}/status"`;
            const response = await (0, got_1.default)(requestUrl, {
                method: 'get',
                headers: {
                    Authorization: `"${auth.token_type} ${auth.access_token}"`
                }
            });
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
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/delete-an-app-submission
    async DeleteSubmission(appId, submissionId) {
        try {
            let auth = await this.authorize();
            const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}"`;
            const response = await (0, got_1.default)(requestUrl, {
                method: 'post',
                headers: {
                    Authorization: `"${auth.token_type} ${auth.access_token}"`
                }
            });
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
    }
    async authorize() {
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
                this.authResult = await this.signin();
            }
            if (this.authResult == null) {
                throw new Error('You could not be authenticated, double check the TenantID, ClientID and ClientSecret. See readme for more info.');
            }
            else {
                return this.authResult;
            }
        }
        catch (ex1) {
            try {
                const error = ex1;
                if (error.statusCode === 401) {
                    // If we got a 401 during a call, we need to get a new token anyways.
                    this.authResult = await this.signin();
                    if (this.authResult == null) {
                        throw new Error('You could not be authenticated, double check the TenantID, ClientID and ClientSecret. See readme for more info.');
                    }
                    else {
                        return this.authResult;
                    }
                }
                else if (error.statusCode === 400) {
                    throw console.error('400 - The request parameters are invalid.');
                }
                else if (error.statusCode === 404) {
                    throw console.error('404 - The specified submission could not be found.');
                }
                else if (error.statusCode === 409) {
                    throw console.error('Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.');
                }
                else {
                    throw console.error(error.statusMessage);
                }
            }
            catch (ex2) {
                throw ex2;
            }
        }
    }
    // https://docs.microsoft.com/en-us/windows/uwp/monetize/create-and-manage-submissions-using-windows-store-services
    async signin() {
        try {
            const rootUrl = `"https://login.microsoftonline.com/${this.tenantId}/oauth2/token HTTP/1.1`;
            let response = await (0, got_1.default)(rootUrl, {
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
    }
}
module.exports = DevCenter;
