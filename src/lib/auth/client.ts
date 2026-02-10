import { createAuthClient } from "better-auth/react";
import posthog from "posthog-js";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : undefined,
  fetchOptions: {
    onError: (ctx) => {
      console.error("Auth Client Error:", ctx.error);
      const error = new Error(ctx.error.message || "Authentication error");

      posthog.captureException(error, {
        tags: {
          code: ctx.error.code,
          status: ctx.error.status,
          source: "better-auth-client",
        },
        extra: {
          response: ctx.response,
          error: ctx.error,
        },
      });

      posthog.capture("auth_error", {
        message: ctx.error.message,
        code: ctx.error.code,
        status: ctx.error.status,
        $exception: true,
      });
    },
  },
});
