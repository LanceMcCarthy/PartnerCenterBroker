import {
  GetSubmissionResult,
  ServiceAuthenticationResult,
  SubmissionStatusResult,
  CommitSubmissionResult,
  CreateAppSubmissionResult,
  AppResourceResult,
  FlightResourceResult,
  UpdateSubmissionResult,
  SubmissionData
} from './interfaces';

export class Convert {
  // JSON to type

  public static toServiceAuthenticationResult(json: string): ServiceAuthenticationResult {
    return JSON.parse(json);
  }

  public static toAppInfoResult(json: string): AppResourceResult {
    return JSON.parse(json);
  }

  public static toCreateAppSubmissionResult(json: string): CreateAppSubmissionResult {
    return JSON.parse(json);
  }

  public static toUpdateSubmissionResult(json: string): UpdateSubmissionResult {
    return JSON.parse(json);
  }

  public static toCommitSubmissionResult(json: string): CommitSubmissionResult {
    return JSON.parse(json);
  }

  public static toGetSubmissionResult(json: string): GetSubmissionResult {
    return JSON.parse(json);
  }

  public static toSubmissionStatusResult(json: string): SubmissionStatusResult {
    return JSON.parse(json);
  }

  public static toSubmissionData(json: string): SubmissionData {
    return JSON.parse(json);
  }

  public static toFlightResourceResult(json: string): FlightResourceResult {
    return JSON.parse(json);
  }

  // Type to JSON

  public static serviceAuthenticationResultToJson(value: ServiceAuthenticationResult): string {
    return JSON.stringify(value);
  }

  public static appInfoResultToJson(value: AppResourceResult): string {
    return JSON.stringify(value);
  }

  public static createAppSubmissionResultToJson(value: CreateAppSubmissionResult): string {
    return JSON.stringify(value);
  }

  public static submissionDataToJson(value: SubmissionData): string {
    return JSON.stringify(value);
  }

  public static updateSubmissionResultToJson(value: UpdateSubmissionResult): string {
    return JSON.stringify(value);
  }

  public static commitSubmissionResultToJson(value: CommitSubmissionResult): string {
    return JSON.stringify(value);
  }

  public static getSubmissionResultToJson(value: GetSubmissionResult): string {
    return JSON.stringify(value);
  }

  public static submissionStatusResultToJson(value: SubmissionStatusResult): string {
    return JSON.stringify(value);
  }

  public static flightResourceResultToJson(value: FlightResourceResult): string {
    return JSON.stringify(value);
  }
}
