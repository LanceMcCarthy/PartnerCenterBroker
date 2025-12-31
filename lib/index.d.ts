import { GetSubmissionResult, SubmissionStatusResult, ServiceAuthenticationResult, CommitSubmissionResult, CreateAppSubmissionResult, AppResourceResult, UpdateSubmissionResult, SubmissionData, ApplicationSubmission, AllowTargetFutureDeviceFamilies, ApplicationPackage, Listings, PackageDeliveryOptions, Pricing, StatusDetails, EnUs, BaseListing, Image, PlatformOverrides, Windows81, PackageRollout, MarketSpecificPricings } from './interfaces';
/**
 * @namespace DevCenter
 */
declare namespace DevCenter {
    export type { ServiceAuthenticationResult, CommitSubmissionResult, CreateAppSubmissionResult, AppResourceResult, GetSubmissionResult, SubmissionStatusResult, UpdateSubmissionResult, SubmissionData, ApplicationSubmission, AllowTargetFutureDeviceFamilies, ApplicationPackage, Listings, PackageDeliveryOptions, Pricing, StatusDetails, EnUs, BaseListing, Image, PlatformOverrides, Windows81, PackageRollout, MarketSpecificPricings };
}
declare class DevCenter {
    tenantId: string;
    clientId: string;
    clientSecret: string;
    authResult: ServiceAuthenticationResult | undefined;
    constructor(_tenantId: string, _clientId: string, _clientSecret: string);
    GetAppInfo(appId: string): Promise<AppResourceResult>;
    CreateAppSubmission(appId: string): Promise<CreateAppSubmissionResult>;
    UpdateSubmission(appId: string, submissionId: string, data: SubmissionData): Promise<UpdateSubmissionResult>;
    CommitSubmission(appId: string, submissionId: string): Promise<CommitSubmissionResult>;
    GetSubmission(appId: string, submissionId: string): Promise<GetSubmissionResult>;
    GetSubmissionStatus(appId: string, submissionId: string): Promise<SubmissionStatusResult>;
    DeleteSubmission(appId: string, submissionId: string): Promise<boolean>;
    authorize(): Promise<ServiceAuthenticationResult>;
    private signin;
}
export = DevCenter;
