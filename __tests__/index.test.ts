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

// test('Test Authentication', async () => {
//   const tenantId = "";
//   const clientId = "";
//   const clientSecret = "";
//   const appId = "";

//   const dc = new DevCenter(tenantId, clientId, clientSecret);

//   console.log("Authorizing...");

//   await dc.authorize();

//   expect(dc.authResult != null)

//   expect(dc.authResult.expires_in).toBeGreaterThan(0);
// })

// test('Test AppInfo Fetch', async () => {
//   const tenantId = "";
//   const clientId = "";
//   const clientSecret = "";
//   const appId = "";

//   const dc = new DevCenter(tenantId, clientId, clientSecret);

//   const appInfoResult = await dc.GetAppInfo(appId);

//   console.log(`"Got informaiton for ${appInfoResult.primaryName}"`);

//   expect(appInfoResult != null);
// })

// test('Test AppInfo Fetch', async () => {
//   const tenantId = "";
//   const clientId = "";
//   const clientSecret = "";
//   const appId = "";

//   const dc = new DevCenter(tenantId, clientId, clientSecret);

//   const appInfoResult = await dc.GetAppInfo(appId)

//   if(appInfoResult.pendingApplicationSubmission != null){
//     const deleteResult = await dc.DeleteSubmission(appId, appInfoResult.pendingApplicationSubmission.id)
//   }

//   const createResult = await dc.CreateAppSubmission(appId)

//   let submissionId = createResult.id;

//   const cloneLastSubmission = true;

//   let subData: SubmissionData = undefined;

//   if(cloneLastSubmission){
//     subData = Helpers.CloneLastSubmissionData(createResult);
//   } else{
//     // create SubmissionData from scratch
//     subData = Helpers.GenerateSampleSubmission();
//   }

//   // TODO need to generate ZIP with json file
//   subData.applicationPackages[0].fileName = "PackageProject_2020.810.59.0_x86_bundle.appxupload"

//   const jsonToBeSaved: string = Convert.submissionDataToJson(subData);
//   const fs = require('fs');
//   fs.writeFileSync('applicationdata.json', jsonToBeSaved);

//   let updateResult = await dc.UpdateSubmission(appId, submissionId, subData);

//   expect(dc != null)
// })

