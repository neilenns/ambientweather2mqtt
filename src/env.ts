import "dotenv/config";
import z, { ZodError } from "zod";

function booleanTransformer(v: string, ctx: z.RefinementCtx) {
  v = v.toLowerCase();
  switch (v) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        expected: z.ZodParsedType.boolean,
        received: z.ZodParsedType.string,
        message: 'Expected "true" or "false"',
      });
      return false;
  }
}

const envSchema = z.object({
  VERSION: z.string().default("dev"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "http", "debug", "trace"]).default("info"),
  PORT: z.coerce.number().default(8132),
  MQTT_SERVER: z.string(),
  MQTT_USERNAME: z.string().optional(),
  MQTT_PASSWORD: z.string().optional(),
  MQTT_REJECT_UNAUTHORIZED: z.string().transform<boolean>(booleanTransformer).default("false"),
  STATION_MAC_ADDRESS: z.string(),
  PUBLISH_NAME: z.string().default("ambientWeather2mqtt"),
  TZ: z.string().default("America/Los_Angeles"),
  TOPIC_ROOT: z.string().optional(),
  NODE_ENV: z.string().default("production"),
  RETAIN_SENSOR_VALUES: z.string().transform<boolean>(booleanTransformer).default("false"),
});

let parsedEnv: z.infer<typeof envSchema>;

try {
  parsedEnv = envSchema.parse(process.env);
} catch (error) {
  const err = error as ZodError;
  err.errors.map((e) => console.error(`Error processing environment variable ${e.path}: ${e.message}`));
  process.exit(1);
}

export default function env(): z.infer<typeof envSchema> {
  return parsedEnv;
}
