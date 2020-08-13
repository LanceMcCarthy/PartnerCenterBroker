import { GetSubmissionResult, SubmissionStatusResult, ServiceAuthenticationResult, CommitSubmissionResult, CreateAppSubmissionResult, AppResourceResult, UpdateSubmissionResult, SubmissionData } from './interfaces';
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
