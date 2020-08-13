import { Convert } from '../src/converters'
import DevCenter = require('../src/index')
import { Helpers } from '../src/helpers';
import { SecretsManager } from '../src/utils/secrets'; // gitignored

import {
  GetSubmissionResult,
  SubmissionStatusResult,
  ServiceAuthenticationResult,
  CommitSubmissionResult,
  CreateAppSubmissionResult,
  AppResourceResult,
  UpdateSubmissionResult
} from '../src/interfaces'

test('Test Variables', ()=>{
  const vars = loadTestVariables();
  const tenantId = vars[0];
  const clientId = vars[1];
  const clientSecret = vars[2];
  const appId = vars[3];

  expect(tenantId !== "")
  expect(clientId !== "")
  expect(clientSecret !== "")
  expect(appId !== "")
})

test('Test Authentication', async () => {
  const vars = loadTestVariables();

  const dev = new DevCenter(vars[0], vars[1], vars[2]);

  console.log("Authorizing...");

  await dev.authorize();

  expect(dev.authResult != null)

  expect(dev.authResult.expires_in).toBeGreaterThan(0);
})

// test('Test AppInfo Fetch', async () => {
//   const vars = loadTestVariables();
//   const tenantId = vars[0];
//   const clientId = vars[1];
//   const clientSecret = vars[2];
//   const appId = vars[3];

//   const dc = new DevCenter(tenantId, clientId, clientSecret);

//   const appInfoResult = await dc.GetAppInfo(appId);

//   console.log(`"Got informaiton for ${appInfoResult.primaryName}"`);

//   expect(appInfoResult != null);
// })

// test('Test AppInfo Fetch', async () => {
//   const vars = loadTestVariables();
//   const tenantId = vars[0];
//   const clientId = vars[1];
//   const clientSecret = vars[2];
//   const appId = vars[3];

//   const dc = new DevCenter(tenantId, clientId, clientSecret);

//   const appInfoResult = await dc.GetAppInfo(appId)

//   const createResult = await dc.CreateAppSubmission(appId)


//   let submissionId = createResult.id;

//   const clonedSubmission = Helpers.CloneLastSubmissionData(createResult);

//   clonedSubmission.applicationPackages[0].fileName = "./TestPackages/PackageProject_2020.810.59.0_x86_bundle.appxupload"

//   let updateResult = await dc.UpdateSubmission(appId, submissionId, clonedSubmission);

//   expect(dc != null)
// })

function loadTestVariables() : string[] {
  const tenantId = SecretsManager.getTenantId();
  const clientId = SecretsManager.getClientId();
  const clientSecret = SecretsManager.getClientSecret();
  const appId = SecretsManager.getAppId();

  return [tenantId, clientId, clientSecret, appId]
}
