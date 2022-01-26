"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
class Helpers {
    static CloneLastSubmissionData(original) {
        const subData = {
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
        };
        return subData;
    }
    static GenerateSampleSubmission() {
        const ovrde = {
            description: ''
        };
        const pltOverrides = {
            Windows81: ovrde
        };
        const imgs = [
            {
                fileName: '',
                fileStatus: '',
                id: '',
                imageType: ''
            },
            {
                fileName: '',
                fileStatus: '',
                id: '',
                imageType: ''
            }
        ];
        const bsListing = {
            copyrightAndTrademarkInfo: '',
            keywords: ['', ''],
            licenseTerms: '',
            privacyPolicy: '',
            supportContact: '',
            websiteUrl: '',
            description: '',
            features: ['', ''],
            releaseNotes: '',
            images: imgs,
            recommendedHardware: [],
            title: ''
        };
        const enusListing = {
            baseListing: bsListing,
            platformOverrides: pltOverrides
        };
        const listings = {
            'en-us': enusListing
        };
        const dvFams = {
            Desktop: true,
            Mobile: true,
            Holographic: true,
            Xbox: true,
            Team: true
        };
        const rllout = {
            isPackageRollout: true,
            packageRolloutPercentage: 100,
            packageRolloutStatus: '',
            fallbackSubmissionId: ''
        };
        const delivOptns = {
            packageRollout: rllout,
            isMandatoryUpdate: true,
            mandatoryUpdateEffectiveDate: new Date(Date.now())
        };
        const pckgs = [
            {
                fileName: '',
                fileStatus: '',
                id: '',
                version: '',
                architecture: '',
                languages: ['', ''],
                capabilities: ['', ''],
                minimumDirectXVersion: '',
                minimumSystemRam: '',
                targetDeviceFamilies: ['', '']
            },
            {
                fileName: '',
                fileStatus: '',
                id: '',
                version: '',
                architecture: '',
                languages: ['', ''],
                capabilities: ['', ''],
                minimumDirectXVersion: '',
                minimumSystemRam: '',
                targetDeviceFamilies: ['', '']
            }
        ];
        const msPcing = {};
        const pcing = {
            trialPeriod: '',
            marketSpecificPricings: msPcing,
            sales: [],
            priceId: '',
            isAdvancedPricingModel: false
        };
        const subData = {
            applicationCategory: '',
            pricing: pcing,
            visibility: '',
            targetPublishMode: '',
            targetPublishDate: new Date(Date.now()),
            listings: listings,
            hardwarePreferences: ['', ''],
            automaticBackupEnabled: true,
            canInstallOnRemovableMedia: true,
            isGameDvrEnabled: true,
            gamingOptions: [],
            hasExternalInAppProducts: false,
            meetAccessibilityGuidelines: true,
            notesForCertification: '',
            applicationPackages: pckgs,
            packageDeliveryOptions: delivOptns,
            enterpriseLicensing: '',
            allowMicrosoftDecideAppAvailabilityToFutureDeviceFamilies: true,
            allowTargetFutureDeviceFamilies: dvFams,
            trailers: []
        };
        return subData;
    }
}
exports.Helpers = Helpers;
