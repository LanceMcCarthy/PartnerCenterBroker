// To parse this data: const appInfoResult = Convert.toAppInfoResult(json);
export interface AppResourceResult {
  id: string
  primaryName: string
  packageFamilyName: string
  packageIdentityName: string
  publisherName: string
  firstPublishedDate: Date
  lastPublishedApplicationSubmission: ApplicationSubmission
  pendingApplicationSubmission: ApplicationSubmission
  hasAdvancedListingPermission: boolean
}

export interface ApplicationSubmission {
  id: string
  resourceLocation: string
}

// To parse this data: const createAppSubmissionResult = Convert.toCreateAppSubmissionResult(json);

export interface CreateAppSubmissionResult {
  id: string
  applicationCategory: string
  pricing: Pricing
  visibility: string
  targetPublishMode: string
  targetPublishDate: Date
  listings: Listings
  hardwarePreferences: string[]
  automaticBackupEnabled: boolean
  canInstallOnRemovableMedia: boolean
  isGameDvrEnabled: boolean
  gamingOptions: any[]
  hasExternalInAppProducts: boolean
  meetAccessibilityGuidelines: boolean
  notesForCertification: string
  status: string
  statusDetails: StatusDetails
  fileUploadUrl: string
  applicationPackages: ApplicationPackage[]
  packageDeliveryOptions: PackageDeliveryOptions
  enterpriseLicensing: string
  allowMicrosoftDecideAppAvailabilityToFutureDeviceFamilies: boolean
  allowTargetFutureDeviceFamilies: AllowTargetFutureDeviceFamilies
  friendlyName: string
  trailers: any[]
}

// To parse this data: const commitSubmissionResult = Convert.toCommitSubmissionResult(json);

export interface CommitSubmissionResult {
  status: string
}

// To parse this data:
// import { SubmissionStatusResult } from "./storeApiModels";

export interface SubmissionStatusResult {
  status: string
  statusDetails: StatusDetails
}

// To parse this data: const ServiceAuthenticationResult = Convert.toServiceAuthenticationResult(json);

export interface ServiceAuthenticationResult {
  access_token: string
  token_type: string
  expires_in: string
  expires_on: string
  resource: string
}

// To parse this data: const getSubmissionResult = Convert.toGetSubmissionResult(json);

export interface GetSubmissionResult {
  id: string
  applicationCategory: string
  pricing: Pricing
  visibility: string
  targetPublishMode: string
  targetPublishDate: Date
  listings: Listings
  hardwarePreferences: string[]
  automaticBackupEnabled: boolean
  canInstallOnRemovableMedia: boolean
  isGameDvrEnabled: boolean
  gamingOptions: any[]
  hasExternalInAppProducts: boolean
  meetAccessibilityGuidelines: boolean
  notesForCertification: string
  status: string
  statusDetails: StatusDetails
  fileUploadUrl: string
  applicationPackages: ApplicationPackage[]
  packageDeliveryOptions: PackageDeliveryOptions
  enterpriseLicensing: string
  allowMicrosoftDecideAppAvailabilityToFutureDeviceFamilies: boolean
  allowTargetFutureDeviceFamilies: AllowTargetFutureDeviceFamilies
  friendlyName: string
  trailers: any[]
}

export interface AllowTargetFutureDeviceFamilies {
  Desktop: boolean
  Mobile: boolean
  Holographic: boolean
  Xbox: boolean
  Team: boolean
}

export interface ApplicationPackage {
  fileName: string
  fileStatus: string
  id: string
  version: string
  architecture: string
  languages: string[]
  capabilities: string[]
  minimumDirectXVersion: string
  minimumSystemRam: string
  targetDeviceFamilies: string[]
}

export interface Listings {
  'en-us': EnUs
}

export interface EnUs {
  baseListing: BaseListing
  platformOverrides: PlatformOverrides
}

export interface BaseListing {
  copyrightAndTrademarkInfo: string
  keywords: string[]
  licenseTerms: string
  privacyPolicy: string
  supportContact: string
  websiteUrl: string
  description: string
  features: string[]
  releaseNotes: string
  images: Image[]
  recommendedHardware: any[]
  title: string
}

export interface Image {
  fileName: string
  fileStatus: string
  id: string
  imageType: string
}

export interface PlatformOverrides {
  Windows81: Windows81
}

export interface Windows81 {
  description: string
}

export interface PackageDeliveryOptions {
  packageRollout: PackageRollout
  isMandatoryUpdate: boolean
  mandatoryUpdateEffectiveDate: Date
}

export interface PackageRollout {
  isPackageRollout: boolean
  packageRolloutPercentage: number
  packageRolloutStatus: string
  fallbackSubmissionId: string
}

export interface Pricing {
  trialPeriod: string
  marketSpecificPricings: MarketSpecificPricings
  sales: any[]
  priceId: string
  isAdvancedPricingModel: boolean
}

export interface MarketSpecificPricings {}

export interface StatusDetails {
  errors: any[]
  warnings: any[]
  certificationReports: any[]
}

// Todo be added in v2
// To parse this data: const flightResourceResult = Convert.toFlightResourceResult(json);
export interface FlightResourceResult {
  flightId: string
  friendlyName: string
  lastPublishedFlightSubmission: FlightSubmission
  pendingFlightSubmission: FlightSubmission
  groupIds: string[]
  rankHigherThan: string
}
export interface FlightSubmission {
  id: string
  resourceLocation: string
}
