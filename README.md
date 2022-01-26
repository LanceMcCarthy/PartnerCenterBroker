# Microsoft Partner Center Broker

A library that lets you use the Microsoft Partner Center (aka DevCenter) APIs to manage your packaged application submissions. Take a look at the [Documentation and API Reference](https://lancemccarthy.github.io/PartnerCenterBroker/) for the latest info.

> This project is still experimental and not production-ready for all scenarios. If you would like a production-ready library, take a look at all the available options here https://docs.microsoft.com/en-us/partner-center/develop/
  
## Usage

### Preparation

You will need the following 4 pieces of information to use this:

* A Service Principal's **Tenant ID**, **Client ID** and **Client Secret** (if you do not have this already, see the Authentication or  section below)
* Your app's **App ID** (aka 'Store ID' in DevCenter). If you do not know this, see the Screenshots section below.

If you do not have any of the above, see the **Quick-Start by Screenshots** section below.

### Implementation

Once you have your **Tenant ID**, **Client ID** and **Client Secret**, you can initialize the `DevCenter` object.

##### Import 

```typescript
import { DevCenter } from 'partner-center-broker'
```

```typescript
const tenantId = "";
const clientId = "";
const clientSecret = "";

// Instantiate the DevCenter class
const devCenter = new DevCenter(tenantId, clientId, clientSecret);
```

##### Get app info

Once you have a valid `DevCenter` instance, you can start making API calls. The first thing you should do is call `GetAppInfo()` using your application's app ID (the Store ID from the preparation section above.

```typescript
const appId = "";

// Get an application's information
const appInfoResult = await devCenter.GetAppInfo(appId);

console.log(`"Got information for ${appInfoResult.primaryName}!"`);
```

##### Deleting a Submission

If you would like to delete a pending submission and start a new one, you only need the appId and submissionId

```typescript
// Using appInfoResult from GetAppInfo()
const submissionPending = appInfoResult.pendingApplicationSubmission != null;

if(submissionPending){
   const getSubmissionStatusResult = await devCenter.DeleteSubmission(appId, submissionId);
}
```

##### Starting a new submission

You can think of a submission as a starting point, a notice that you want to update the app. 

```typescript
// To create a submission 
const createSubmissionResult = await devCenter.CreateAppSubmission(appId);

// Grab the submission ID for use in the rest of the workflow.
const submissionId = createSubmissionResult.Id;
```

##### Updating the submission with the Submission Data

This is where things get complicated. The submission body needs a lot of info (see the `Update Submission Request Body` section at the bottom of this page). To keep things as simple as possible, you can clone the last app submission using the `CloneLastSubmissionData` helper method.

```typescript
// Uses createSubmissionResult and submissionId previous step

// This copies all the data from the prvious submission into the new submission
const clonedSubmission = Helpers.CloneLastSubmissionData(createSubmissionResult);

// In this example we are only changing the name of the file that is going to be inside the uploaded assets.
clonedSubmission.applicationPackages[0].fileName = "PathInZip/MyApp_x86_bundle.appxupload"

// Update the submissino with the new app data
const updateResult = await dev.UpdateSubmission(appId, submissionId, clonedSubmission);
```

> If you would like to alter more than just the package file, see the 

##### Preparing and uploading assets

As part of the SubmissionResult object you will get an SAS storage URL in the `CommitSubmissionResult.fileUploadUrl` value. That is the location you need to upload the application submission data. The best way to approach this is to use the Azure Store SDK (**'@azure/storage-blob'**) and use `BlockBlobClient`. 

```typescript
// from previous steps
const sasUploadUrl = createSubmissionResult.fileUploadUrl;

// the pre-authenticated SAS url can be used to create a BlockBlobClient
// requires import { BlockBlobClient } from '@azure/storage-blob'
const blobClient = await new BlockBlobClient(startSubmissionResult.fileUploadUrl);

// PREPARE ZIP file that contains all the required info (see Submission Data section below)
const assetFile = "submission.zip";

// Upload the zip file
await blobClient.uploadFile(assetFile);

```
##### Submit

Finally you can commit the submission once all the submission data has been updated and uploaded.

```typescript
// SubmissionId and AppId are from previous steps

// Commit a submission for review
const commitSubmissionResult = await devCenter.CommitSubmission(appId, submissionId);

```

##### Polling/Checking Status

You can check the status of a submission with the following method

```typescript
// SubmissionId and AppId are from previous steps
const statusResult = await dc.GetSubmissionStatus(appId, submissionId)
```

This could be used to poll a submission as it returns value for every stage of the submission, including failures. See

## Service Principal and Authentication

For a more robust explanation of how to create this information, visit the Microsoft Store Broker documentation's [Authentication section](https://github.com/microsoft/StoreBroker/blob/master/Documentation/SETUP.md#authentication). For your convenience, I have copied and modified that info to streamline it.

You need three key pieces of information from Azure portal:

* `TenantId`: This is the ID of the Azure Active Directory (AAD) connected to your developer account.
* `ClientId` and `ClientSecret`: Essentially a username/password for a "user" that you create for StoreBroker to be able to use the API against your developer account on your behalf.

> You only need to perform this task once, the credentials can be reused for every run. **Protect the `Client ID` and `Client Secret` as if they were your username and password**.

To get those values:

1. In Dev Center, go to your **Account settings**, click **Manage users**, and associate your
   organization's Dev Center account with your organization's AAD. For detailed instructions,
   see [Manage account users](https://msdn.microsoft.com/windows/uwp/publish/manage-account-users).

2. In the **Manage users** page, click **Add Azure AD applications**, add the Azure AD application
   that represents the app or service that you will use to access submissions for your Dev Center
   account, and assign it the **Manager** role. If this application already exists in your AAD,
   you can select it on the **Add Azure AD applications** page to add it to your Dev Center account.
   Otherwise, you can create a new AAD application on the **Add Azure AD applications** page.
   For more information, see [Add and manage Azure AD applications](https://msdn.microsoft.com/windows/uwp/publish/manage-account-users#add-and-manage-azure-ad-applications). 

3. Return to the **Manage users** page, click the name of your Azure AD application to go to the
   application settings, and copy the **Tenant ID** and **Client ID** values.

4. Click **Add new key**. On the following screen, copy the **Key** value, which corresponds to the
   **Client secret**. You *will not* be able to access this info again after you leave this page,
   so make sure to not lose it. For more information, see the information about managing keys in
   [Add and manage Azure AD applications](https://msdn.microsoft.com/windows/uwp/publish/manage-account-users#add-and-manage-azure-ad-applications).

> These steps are directly from the Partner Center [API Documentation](https://msdn.microsoft.com/windows/uwp/monetize/create-and-manage-submissions-using-windows-store-services).

## Quick-Start by Screenshots

### Getting Service Principal Credentials from Azure Portal

#### Step 1

![Step One](https://raw.githubusercontent.com/LanceMcCarthy/PartnerCenterBroker/main/.images/ServicePrincipal1.png)

#### Step 2

![Step Two](https://raw.githubusercontent.com/LanceMcCarthy/PartnerCenterBroker/main/.images/ServicePrincipal2.png)

#### Step 3

![Step Three](https://raw.githubusercontent.com/LanceMcCarthy/PartnerCenterBroker/main/.images/ServicePrincipal3.png)

## Getting the App ID

Go to Microsoft [Partner Center Developer Dashboard](https://partner.microsoft.com/en-us/dashboard/windows/overview) and navigate to your app's page. Once there, open the *Product Management > Product Identity* pane.

![Find App ID](https://raw.githubusercontent.com/LanceMcCarthy/PartnerCenterBroker/main/.images/FindAppId.png)

## Submission Preparation

The `UpdateSubmmissionRequest` call must have the following details in JSON format. I have made this easier by allowing you to use a single typeScript object and the library will do the conversion for you.

# Interfaces and Parameters

## Status Values

Here are the possible status messages:

```text
  None
  Canceled
  PendingCommit
  CommitStarted
  CommitFailed
  PendingPublication
  Publishing
  Published
  PublishFailed
  PreProcessing
  PreProcessingFailed
  Certification
  CertificationFailed
  Release
  ReleaseFailed
```

## `ApplicationData` Interface

The `UpdateSubmission()` method requires a parameter of type `ApplicationData`. This gets converted to JSON and is used as the body of the PUT request to the DevCenter API. 

You can create this from scratch, but it is **strongly** recommended that you clone this from the last submission using the `Helpers.CloneLastSubmissionData()` helper method, and then modify any values afterwards.


| Value                                    | Type    | Description                              |
|------------------------------------------|---------|------------------------------------------|
| applicationCategory                      | string  | A string that specifies the [category and/or subcategory](https://docs.microsoft.com/en-us/windows/uwp/publish/category-and-subcategory-table) for your app. Categories and subcategories are combined into a single string with the underscore '_' character, such as **BooksAndReference_EReader**. |
| pricing                                  | object  | An object that contains pricing info for the app. For more information, see the [Pricing resource](https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions#pricing-object) section. |
| visibility                               | string  | The visibility of the app. This can be one of the following values: * Hidden * Public * Private * NotSet |
| targetPublishMode                        | string  | The publish mode for the submission. This can be one of the following values: * Immediate * Manual * SpecificDate |
| targetPublishDate                        | string  | The publish date for the submission in ISO 8601 format, if the _targetPublishMode_ is set to SpecificDate. |
| listings                                 | object  | A dictionary of key and value pairs, where each key is a country code and each value is a [Listing resource](https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions#listing-object) object that contains listing info for the app. |
| hardwarePreferences                      | array   | An array of strings that define the [hardware preferences](https://docs.microsoft.com/en-us/en-us/windows/uwp/publish/enter-app-properties) for your app. This can be one of the following values: * Touch * Keyboard * Mouse * Camera * NfcHce * Nfc * BluetoothLE * Telephony |
| automaticBackupEnabled                   | boolean | Indicates whether Windows can include your app's data in automatic backups to OneDrive. For more information, see [App declarations](https://docs.microsoft.com/en-us/en-us/windows/uwp/publish/app-declarations). |
| canInstallOnRemovableMedia               | boolean | Indicates whether customers can install your app to removable storage. For more information, see [App declarations](https://docs.microsoft.com/en-us/en-us/windows/uwp/publish/app-declarations). |
| isGameDvrEnabled                         | boolean | Indicates whether game DVR is enabled for the app. |
| gamingOptions                            | object  | An array that contains one [gaming options resource](https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions#gaming-options-object) that defines game-related settings for the app. |
| hasExternalInAppProducts                 | boolean | Indicates whether your app allows users to make purchase outside the Microsoft Store commerce system. For more information, see [App declarations](https://docs.microsoft.com/en-us/en-us/windows/uwp/publish/app-declarations). |
| meetAccessibilityGuidelines              | boolean | Indicates whether your app has been tested to meet accessibility guidelines. For more information, see [App declarations](https://docs.microsoft.com/en-us/en-us/windows/uwp/publish/app-declarations). |
| notesForCertification                    | string  | Contains [notes for certification](https://docs.microsoft.com/en-us/en-us/windows/uwp/publish/notes-for-certification) for your app. |
| applicationPackages                      | array   | Contains objects that provide details about each package in the submission. For more information, see the [Application package](https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions#application-package-object) section. When calling this method to update an app submission, only the _fileName_, _fileStatus_, _minimumDirectXVersion_, and _minimumSystemRam_ values of these objects are required in the request body. The other values are populated by Partner Center. |
| packageDeliveryOptions                   | object  | Contains gradual package rollout and mandatory update settings for the submission. For more information, see [Package delivery options object](https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions#package-delivery-options-object). |
| enterpriseLicensing                      | string  | One of the [enterprise licensing values](https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions#enterprise-licensing) values that indicate the enterprise licensing behavior for the app. |
| allowMicrosftDecideAppAvailabilityToFutureDeviceFamilies | boolean | Indicates whether Microsoft is allowed to [make the app available to future Windows 10 device families](https://docs.microsoft.com/en-us/windows/uwp/publish/set-app-pricing-and-availability). |
| allowTargetFutureDeviceFamilies          | boolean | Indicates whether your app is allowed to [target future Windows 10 device families](https://docs.microsoft.com/en-us/windows/uwp/publish/set-app-pricing-and-availability). |
| trailers                                 | array   | An array that contains up to [trailer resources](https://docs.microsoft.com/en-us/windows/uwp/monetize/manage-app-submissions#trailer-object) that represent video trailers for the app listing. |




