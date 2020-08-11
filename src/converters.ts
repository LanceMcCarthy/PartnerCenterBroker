import { GetSubmissionResult, ServiceAuthenticationResult, SubmissionStatusResult, CommitSubmissionResult, CreateAppSubmissionResult, AppResourceResult, FlightResourceResult } from "./interfaces"

export class Convert {
    public static toGetSubmissionResult(json: string): GetSubmissionResult {
      return JSON.parse(json)
    }

    public static getSubmissionResultToJson(value: GetSubmissionResult): string {
      return JSON.stringify(value)
    }

    public static toServiceAuthenticationResult(
      json: string
    ): ServiceAuthenticationResult {
      return JSON.parse(json)
    }

    public static serviceAuthenticationResultToJson(
      value: ServiceAuthenticationResult
    ): string {
      return JSON.stringify(value)
    }

    public static toSubmissionStatusResult(json: string): SubmissionStatusResult {
      return JSON.parse(json)
    }

    public static submissionStatusResultToJson(
      value: SubmissionStatusResult
    ): string {
      return JSON.stringify(value)
    }

    public static toCommitSubmissionResult(json: string): CommitSubmissionResult {
      return JSON.parse(json)
    }

    public static commitSubmissionResultToJson(
      value: CommitSubmissionResult
    ): string {
      return JSON.stringify(value)
    }

    public static toCreateAppSubmissionResult(
      json: string
    ): CreateAppSubmissionResult {
      return JSON.parse(json)
    }

    public static createAppSubmissionResultToJson(
      value: CreateAppSubmissionResult
    ): string {
      return JSON.stringify(value)
    }

    public static toAppInfoResult(json: string): AppResourceResult {
      return JSON.parse(json)
    }

    public static appInfoResultToJson(value: AppResourceResult): string {
      return JSON.stringify(value)
    }

    public static toFlightResourceResult(json: string): FlightResourceResult {
      return JSON.parse(json)
    }

    public static flightResourceResultToJson(
      value: FlightResourceResult
    ): string {
      return JSON.stringify(value)
    }
  }
