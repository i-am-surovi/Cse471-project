 import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://9c276da57b3d5d2428ed8460de357966@o4509953782775808.ingest.us.sentry.io/4509953848442880",
  integrations: [
    Sentry.mongoIntegration()
  ],
});  

Sentry.profiler.startProfiler();