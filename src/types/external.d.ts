// Temporary type declarations for external libraries used on the backend.
// These are lightweight stubs so the project type-checks before the actual
// runtime dependencies are installed in the hosting environment.

declare module "@google/generative-ai" {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(config: { model: string }): {
      generateContent(
        input:
          | string
          | {
              contents: Array<{
                role?: string;
                parts: Array<{ text: string }>;
              }>;
            },
      ): Promise<{
        response: {
          text(): string;
        };
      }>;
    };
  }
}

declare module "next/server" {
  export class NextResponse {
    static json(
      body: unknown,
      init?: {
        status?: number;
        headers?: Record<string, string>;
      },
    ): Response;
  }
}

