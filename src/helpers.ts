import {
  GetSubmissionResult,
  SubmissionStatusResult,
  ServiceAuthenticationResult,
  CommitSubmissionResult,
  CreateAppSubmissionResult,
  AppResourceResult,
  UpdateSubmissionResult,
  SubmissionData,
  Pricing,
  ApplicationPackage,
  PackageDeliveryOptions,
  Listings,
  Windows81,
  PlatformOverrides,
  BaseListing,
  EnUs,
  Image,
  AllowTargetFutureDeviceFamilies,
  PackageRollout,
  MarketSpecificPricings
} from '../src/interfaces'

export class Helpers{
  static CloneLastSubmissionData(original: CreateAppSubmissionResult): SubmissionData {
    const subData: SubmissionData = {
      applicationCategory: original.applicationCategory,
      pricing: original.pricing,
      visibility: original.visibility,
      targetPublishMode: original.targetPublishMode,
      targetPublishDate: original.targetPublishDate,
      listings: original.listings,
      hardwarePreferences: original.hardwarePreferences,
      automaticBackupEnabled: original.automaticBackupEnabled,
      canInstallOnRemovableMedia: original.canInstallOnRemovableMedia,
      isGameDvrEnabled: original.isGameDvrEnabled,
      gamingOptions: original.gamingOptions,
      hasExternalInAppProducts: original.hasExternalInAppProducts,
      meetAccessibilityGuidelines: original.meetAccessibilityGuidelines,
      notesForCertification: original.notesForCertification,
      applicationPackages: original.applicationPackages,
      packageDeliveryOptions: original.packageDeliveryOptions,
      enterpriseLicensing: original.enterpriseLicensing,
      allowMicrosoftDecideAppAvailabilityToFutureDeviceFamilies: original.allowMicrosoftDecideAppAvailabilityToFutureDeviceFamilies,
      allowTargetFutureDeviceFamilies: original.allowTargetFutureDeviceFamilies,
      trailers: original.trailers
    }

    return subData;
  }

  static GenerateSampleSubmission(): SubmissionData{
    const ovrde: Windows81 = {
      description: ""
    }

    const pltOverrides: PlatformOverrides = {
      Windows81: ovrde
    }

    const imgs: Image[] = [
      {
        fileName: "",
        fileStatus: "",
        id: "",
        imageType: "",
      }, {
        fileName: "",
        fileStatus: "",
        id: "",
        imageType: "",
      }
    ]

    const bsListing: BaseListing = {
      copyrightAndTrademarkInfo: "",
      keywords: ["", ""],
      licenseTerms: "",
      privacyPolicy: "",
      supportContact: "",
      websiteUrl: "",
      description: "",
      features: ["", ""],
      releaseNotes: "",
      images: imgs,
      recommendedHardware: [],
      title: ""
    }

    const enusListing: EnUs = {
      baseListing: bsListing,
      platformOverrides: pltOverrides
    }

    const listings: Listings = {
      "en-us": enusListing
    }

    const dvFams: AllowTargetFutureDeviceFamilies = {
      Desktop: true,
      Mobile: true,
      Holographic: true,
      Xbox: true,
      Team: true,
    }
    const rllout: PackageRollout = {
      isPackageRollout: true,
      packageRolloutPercentage: 100,
      packageRolloutStatus: "",
      fallbackSubmissionId: ""
    }

    const delivOptns: PackageDeliveryOptions = {
      packageRollout: rllout,
      isMandatoryUpdate: true,
      mandatoryUpdateEffectiveDate: new Date(Date.now())
    }

    const pckgs: ApplicationPackage[] = [{
        fileName: "",
        fileStatus: "",
        id: "",
        version: "",
        architecture: "",
        languages: ["",""],
        capabilities: ["",""],
        minimumDirectXVersion: "",
        minimumSystemRam: "",
        targetDeviceFamilies: ["",""]
      },{
        fileName: "",
        fileStatus: "",
        id: "",
        version: "",
        architecture: "",
        languages: ["",""],
        capabilities: ["",""],
        minimumDirectXVersion: "",
        minimumSystemRam: "",
        targetDeviceFamilies: ["",""]
      }
    ]

    const msPcing: MarketSpecificPricings = {}

    const pcing: Pricing = {
      trialPeriod: "",
      marketSpecificPricings: msPcing,
      sales: [],
      priceId: "",
      isAdvancedPricingModel: false
    }

    const subData: SubmissionData = {
      applicationCategory: "",
      pricing: pcing,
      visibility: "",
      targetPublishMode: "",
      targetPublishDate: new Date(Date.now()),
      listings: listings,
      hardwarePreferences: ["", ""],
      automaticBackupEnabled: true,
      canInstallOnRemovableMedia: true,
      isGameDvrEnabled: true,
      gamingOptions: [],
      hasExternalInAppProducts: false,
      meetAccessibilityGuidelines: true,
      notesForCertification: "",
      applicationPackages: pckgs,
      packageDeliveryOptions: delivOptns,
      enterpriseLicensing: "",
      allowMicrosoftDecideAppAvailabilityToFutureDeviceFamilies: true,
      allowTargetFutureDeviceFamilies: dvFams,
      trailers: []
    }

    return subData;
  }
}
