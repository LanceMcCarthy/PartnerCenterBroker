import got from 'got'
import qs from 'querystring'
import {Convert} from './converters'
import {
  GetSubmissionResult,
  SubmissionStatusResult,
  ServiceAuthenticationResult,
  CommitSubmissionResult,
  CreateAppSubmissionResult,
  AppResourceResult
} from './interfaces'

// Partner Center API https://docs.microsoft.com/en-us/windows/uwp/monetize/create-and-manage-submissions-using-windows-store-services
// API endpoints https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions
class DevCenter {
  tenantId: string
  clientId: string
  clientSecret: string
  authResult: ServiceAuthenticationResult | undefined

  constructor(_tenantId: string, _clientId: string, _clientSecret: string) {
    if (_tenantId == null || _clientId == null || _clientSecret) {
      throw new Error(
        'You must pass a valid Tenent ID, Client ID and Client Secret. See the documentation for more information https://lancemccarthy.github.io/PartnerCenterBroker/.'
      )
    }

    this.tenantId = _tenantId
    this.clientId = _clientId
    this.clientSecret = _clientSecret
  }

  // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-app-data
  public async GetAppInfo(appId: string): Promise<AppResourceResult> {
    try {

      const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}"`
      const response = await this.apiRequest(requestUrl, 'get')

      if (response.statusCode == 200) {
        return Convert.toAppInfoResult(response.body)
      } else if (response.statusCode === 400) {
        throw console.error('400 - The request parameters are invalid.')
      } else if (response.statusCode === 404) {
        throw console.error('404 - The specified submission could not be found.')
      } else if (response.statusCode === 409) {
        throw console.error(
          'Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.'
        )
      } else {
        throw console.error(response.statusMessage)
      }
    } catch (err) {
      throw err
    }
  }

  // https://docs.microsoft.com/en-us/windows/uwp/monetize/create-an-app-submission
  public async CreateAppSubmission(appId: string): Promise<CreateAppSubmissionResult> {
    try {

      const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions"`
      const response = await this.apiRequest(requestUrl, 'post')

      if (response.statusCode == 200) {
        return Convert.toCreateAppSubmissionResult(response.body)
      } else if (response.statusCode === 400) {
        throw console.error('400 - The request parameters are invalid.')
      } else if (response.statusCode === 404) {
        throw console.error('404 - The specified submission could not be found.')
      } else if (response.statusCode === 409) {
        throw console.error(
          'Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.'
        )
      } else {
        throw console.error(response.statusMessage)
      }
    } catch (err) {
      throw console.error(err)
    }
  }

  // https://docs.microsoft.com/en-us/windows/uwp/monetize/commit-an-app-submission
  public async CommitSubmission(appId: string, submissionId: string): Promise<CommitSubmissionResult> {
    try {

      const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}/commit"`
      const response = await this.apiRequest(requestUrl, 'post')

      if (response.statusCode == 200) {
        return Convert.toCommitSubmissionResult(response.body)
      } else if (response.statusCode === 400) {
        throw console.error('400 - The request parameters are invalid.')
      } else if (response.statusCode === 404) {
        throw console.error('404 - The specified submission could not be found.')
      } else if (response.statusCode === 409) {
        throw console.error(
          'Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.'
        )
      } else {
        throw console.error(response.statusMessage)
      }
    } catch (err) {
      throw err
    }
  }

  // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-an-app-submission
  public async GetSubmission(appId: string, submissionId: string): Promise<GetSubmissionResult> {
    try {

      const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}"`
      const response = await this.apiRequest(requestUrl, 'post')

      if (response.statusCode == 200) {
        return Convert.toGetSubmissionResult(response.body)
      } else if (response.statusCode === 400) {
        throw console.error('400 - The request parameters are invalid.')
      } else if (response.statusCode === 404) {
        throw console.error('404 - The specified submission could not be found.')
      } else if (response.statusCode === 409) {
        throw console.error(
          'Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.'
        )
      } else {
        throw console.error(response.statusMessage)
      }
    } catch (err) {
      throw console.error(err)
    }
  }

  // https://docs.microsoft.com/en-us/windows/uwp/monetize/get-status-for-an-app-submission
  public async GetSubmissionStatus(appId: string, submissionId: string): Promise<SubmissionStatusResult> {
    try {

      const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}/status"`
      const response = await this.apiRequest(requestUrl, 'get')

      if (response.statusCode == 200) {
        return Convert.toSubmissionStatusResult(response.body)
      } else if (response.statusCode === 400) {
        throw console.error('400 - The request parameters are invalid.')
      } else if (response.statusCode === 404) {
        throw console.error('404 - The specified submission could not be found.')
      } else if (response.statusCode === 409) {
        throw console.error(
          'Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.'
        )
      } else {
        throw console.error(response.statusMessage)
      }
    } catch (err) {
      throw console.error(err)
    }
  }

  public async DeleteSubmission(appId: string, submissionId: string): Promise<boolean> {
    try {

      const requestUrl = `"https://manage.devcenter.microsoft.com/v1.0/my/applications/${appId}/submissions/${submissionId}"`
      const response = await this.apiRequest(requestUrl, 'post')

      if (response.statusCode == 200) {
        return true
      } else if (response.statusCode === 400) {
        throw console.error('400 - The request parameters are invalid.')
      } else if (response.statusCode === 404) {
        throw console.error('404 - The specified submission could not be found.')
      } else if (response.statusCode === 409) {
        throw console.error(
          'Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.'
        )
      } else {
        return false
      }
    } catch (err) {
      throw console.error(err)
    }
  }

  private async apiRequest(url: string, httpRequestMethod: any): Promise<any> {
    try {
      let needsNewToken = false

      if (this.authResult == undefined) {
        // First time authentication.
        needsNewToken = true
      } else if (Number(this.authResult.expires_on) < new Date('1970-01-01T0:0:0Z').getSeconds()) {
        // If the previous authentication has expired.
        needsNewToken = true
      }

      if (needsNewToken) {
        this.authResult = await this.signin()
        // To future-proof this, instead of hard coding the token type to "Bearer", I am appending the expected type
        //const authHeader = `"${authResult.token_type} ${authResult.access_token}"`;
        //options.headers.authorization = authHeader;
      }

      if (this.authResult == null) {
        throw new Error(
          'You could not be authenticated, double check the TenantID, ClientID and ClientSecret. See readme for more info.'
        )
      }

      return await got(url, {
        method: httpRequestMethod,
        headers: {
          Authorization: `"${this.authResult.token_type} ${this.authResult.access_token}"`
        }
      })
    } catch (ex) {
      try {
        if (ex.statusCode === 401) {

          // If we got a 401 during a call, we need to get a new token anyways.
          this.authResult = await this.signin()

          if (this.authResult == null) {
            throw new Error(
              'You could not be authenticated, double check the TenantID, ClientID and ClientSecret. See readme for more info.'
            )
          }

          return await got(url, {
            method: httpRequestMethod,
            headers: {
              Authorization: `"${this.authResult.token_type} ${this.authResult.access_token}"`
            }
          })
        } else if (ex.statusCode === 400) {
          throw console.error('400 - The request parameters are invalid.')
        } else if (ex.statusCode === 404) {
          throw console.error('404 - The specified submission could not be found.')
        } else if (ex.statusCode === 409) {
          throw console.error(
            'Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.'
          )
        } else {
          throw console.error(ex.statusMessage)
        }
      } catch (ex) {
        throw ex
      }
    }
  }

  // https://docs.microsoft.com/en-us/windows/uwp/monetize/create-and-manage-submissions-using-windows-store-services
  private async signin(): Promise<ServiceAuthenticationResult> {
    try {
      const rootUrl = `"https://login.microsoftonline.com/${this.tenantId}/oauth2/token HTTP/1.1`

      let response = await got(rootUrl, {
        method: 'post',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
          grant_type: 'client_credentials',
          resource: 'https://manage.devcenter.microsoft.com',
          client_id: this.clientId,
          client_secret: this.clientSecret
        })
      })

      if (response.statusCode == 200) {
        return Convert.toServiceAuthenticationResult(response.body)
      } else if (response.statusCode === 400) {
        throw console.error('400 - The request parameters are invalid.')
      } else if (response.statusCode === 404) {
        throw console.error('404 - The specified submission could not be found.')
      } else if (response.statusCode === 409) {
        throw console.error(
          'Error 409 - The specified submission was found but it could not be committed in its current state, or the app uses a Partner Center feature that is currently not supported by the Microsoft Store submission API.'
        )
      } else {
        throw console.error(response.statusMessage)
      }
    } catch (err) {
      throw console.error(err)
    }
  }
}

export = DevCenter
