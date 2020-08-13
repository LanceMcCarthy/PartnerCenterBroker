import { GetSubmissionResult, ServiceAuthenticationResult, SubmissionStatusResult, CommitSubmissionResult, CreateAppSubmissionResult, AppResourceResult, FlightResourceResult, UpdateSubmissionResult, SubmissionData } from './interfaces';
export declare class Convert {
    static toServiceAuthenticationResult(json: string): ServiceAuthenticationResult;
    static toAppInfoResult(json: string): AppResourceResult;
    static toCreateAppSubmissionResult(json: string): CreateAppSubmissionResult;
    static toUpdateSubmissionResult(json: string): UpdateSubmissionResult;
    static toCommitSubmissionResult(json: string): CommitSubmissionResult;
    static toGetSubmissionResult(json: string): GetSubmissionResult;
    static toSubmissionStatusResult(json: string): SubmissionStatusResult;
    static toSubmissionData(json: string): SubmissionData;
    static toFlightResourceResult(json: string): FlightResourceResult;
    static serviceAuthenticationResultToJson(value: ServiceAuthenticationResult): string;
    static appInfoResultToJson(value: AppResourceResult): string;
    static createAppSubmissionResultToJson(value: CreateAppSubmissionResult): string;
    static submissionDataToJson(value: SubmissionData): string;
    static updateSubmissionResultToJson(value: UpdateSubmissionResult): string;
    static commitSubmissionResultToJson(value: CommitSubmissionResult): string;
    static getSubmissionResultToJson(value: GetSubmissionResult): string;
    static submissionStatusResultToJson(value: SubmissionStatusResult): string;
    static flightResourceResultToJson(value: FlightResourceResult): string;
}
