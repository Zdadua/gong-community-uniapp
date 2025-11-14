import { Verification } from "./Verification";

export interface ResetResponse {
	email: string;
	password: string;
	verification: Verification;
}