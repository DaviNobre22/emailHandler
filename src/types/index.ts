export interface ApiResponse<T = unknown> {
  succes: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: string;
}
export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
}

export interface JobResponse {
  success: boolean;
  message: string;
  jobId: string | undefined;
}

export interface HealthResponse {
  status: "healthy" | "unhealthy";
  redis?: string;
  queue?: {
    waiting: number;
    active: number;
    completed: number;
    failed: number;
  };
  error?: string;
}
