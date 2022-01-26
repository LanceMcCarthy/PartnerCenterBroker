import { Convert } from '../src/converters'
import DevCenter = require('../src/index')
import { Helpers } from '../src/helpers';

import {
  GetSubmissionResult,
  SubmissionStatusResult,
  ServiceAuthenticationResult,
  CommitSubmissionResult,
  CreateAppSubmissionResult,
  AppResourceResult,
  UpdateSubmissionResult,
  SubmissionData
} from '../src/interfaces'

describe("Parameter Tests", ()=>{
  test('Missing Tenant ID Should Throw Error', () => {
    expect(() => {
      const tenantId = "";
      const clientId = "abcdefg";
      const clientSecret = "abcdefg";
  
      const func = new DevCenter(tenantId, clientId, clientSecret);
  
    }).toThrow('You must pass a valid Tenant ID. See the documentation for examples and guidance https://lancemccarthy.github.io/PartnerCenterBroker/.');
  });
  
  test('Missing Client ID Should Throw Error', () => {
    expect(() => {
      const tenantId = "abcdefg";
      const clientId = "";
      const clientSecret = "abcdefg";
  
      const func = new DevCenter(tenantId, clientId, clientSecret);
  
    }).toThrow('You must pass a valid Client ID. See the documentation for examples and guidance https://lancemccarthy.github.io/PartnerCenterBroker/.');
  });
  
  test('Missing Client Secret Should Throw Error', () => {
    expect(() => {
      const tenantId = "abcdefg";
      const clientId = "abcdefg";
      const clientSecret = "";
  
      const func = new DevCenter(tenantId, clientId, clientSecret);
  
    }).toThrow('You must pass a valid Client Secret. See the documentation for examples and guidance https://lancemccarthy.github.io/PartnerCenterBroker/.');
  });
});

describe("API Tests", ()=>{
  const tenantId = process.env.PARTNER_CENTER_TENANT_ID;
  const clientId = process.env.PARTNER_CENTER_CLIENT_ID;
  const clientSecret = process.env.PARTNER_CENTER_CLIENT_SECRET;
  const appId = process.env.PARTNER_CENTER_APP_ID;

  if(!tenantId){
    return;
  }
  if(!clientId){
    return;
  }
  if(!clientSecret){
    return;
  }
  if(!appId){
    return;
  }

  test.skip('Test Authentication', async () => {
    const dc = new DevCenter(tenantId, clientId, clientSecret);
  
    console.log("Authorizing...");
  
    let authResult = await dc.authorize();
  
    console.log(authResult.expires_in);
  
    expect(authResult != null)
  
    expect(authResult.expires_in).toBeGreaterThan(0);
  })

  test.skip('Test AppInfo Fetch', async () => {
    const dc = new DevCenter(tenantId, clientId, clientSecret);
  
    const appInfoResult = await dc.GetAppInfo(appId);
  
    console.log(`"Got informaiton for ${appInfoResult.primaryName}"`);
  
    expect(appInfoResult != null);
  })

  test.skip('Create and Uploading Submission', async () => {
    const dc = new DevCenter(tenantId, clientId, clientSecret);
  
    const appInfoResult = await dc.GetAppInfo(appId)
  
    if(appInfoResult.pendingApplicationSubmission != null){
      const deleteResult = await dc.DeleteSubmission(appId, appInfoResult.pendingApplicationSubmission.id)
    }
  
    const createResult = await dc.CreateAppSubmission(appId)
  
    let submissionId = createResult.id;
  
    const cloneLastSubmission = true;
  
    let subData: SubmissionData;
  
    if(cloneLastSubmission){
      subData = Helpers.CloneLastSubmissionData(createResult);
    } else{
      // create SubmissionData from scratch
      subData = Helpers.GenerateSampleSubmission();
    }
  
    // TODO need to generate ZIP with json file
    subData.applicationPackages[0].fileName = "PackageProject_2020.810.59.0_x86_bundle.appxupload"
  
    const jsonToBeSaved: string = Convert.submissionDataToJson(subData);
    const fs = require('fs');
    fs.writeFileSync('applicationdata.json', jsonToBeSaved);
  
    let updateResult = await dc.UpdateSubmission(appId, submissionId, subData);
  
    expect(dc != null)
  })
});
