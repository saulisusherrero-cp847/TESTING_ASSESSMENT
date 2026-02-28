import * as fs from 'fs';
import * as path from 'path';

export type EnvName = 'local' | 'staging' | 'production';

export interface EnvConfigFile {
  env: EnvName;
  urls: Record<EnvName, string>;
}

function assertEnvName(value: string): asserts value is EnvName {
  const allowed = ['local', 'staging', 'production'] as const;
  if (!allowed.includes(value as EnvName)) {
    throw new Error(`[envResolver] Invalid environment name: "${value}". Allowed: ${allowed.join(', ')}`);
  }
}

/** Reads env.config.json from the project root (process.cwd()). */
function readEnvConfigFile(): EnvConfigFile {
  const configPath = path.resolve(process.cwd(), 'env.config.json');

  if (!fs.existsSync(configPath)) {
    throw new Error(
      `env.config.json not found at: ${configPath}. ` +
      `Please ensure the file exists in the project root.`
    );
  }

  const raw = fs.readFileSync(configPath, 'utf-8');
  

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (e) {
    throw new Error(
      `Failed to parse env.config.json. Make sure it contains valid JSON. Original error: ${(e as Error).message}`
    );
  }

  const cfg = json as Partial<EnvConfigFile>;
  if (!cfg.env || !cfg.urls) {
    throw new Error('env.config.json is malformed. Expected properties: "env" and "urls".');
  }
  assertEnvName(cfg.env);

  // Quick URL sanity: ensure keys exist for all envs
  const required: EnvName[] = ['local', 'staging', 'production'];
  for (const key of required) {
    if (!cfg.urls[key]) {
      throw new Error(`env.config.json is missing a URL for environment "${key}".`);
    }
  }

  return cfg as EnvConfigFile;
}

/**
 * Resolves the active environment.
 * Priority:
 * 1) process.env.TEST_ENV (CLI/CI)
 * 2) env.config.json      (local default)
 */
export function getActiveEnvName(): EnvName {
  const envFromCli = process.env.TEST_ENV?.trim();
  if (envFromCli) {
    assertEnvName(envFromCli);
    console.log(`[envResolver] Using environment from TEST_ENV: ${envFromCli}`);
    return envFromCli;
  }

  const fileConfig = readEnvConfigFile();
  console.log(`[envResolver] Using environment from env.config.json: ${fileConfig.env}`);
  return fileConfig.env;
}

/** Returns the base URL for the given environment. Ensures trailing slash. */
export function getBaseUrlForEnv(envName?: EnvName): string {
  const fileConfig = readEnvConfigFile();
  const finalEnv = envName ?? getActiveEnvName();
  const url = fileConfig.urls[finalEnv];

  if (!url) {
    throw new Error(`[envResolver] No URL configured for environment: ${finalEnv}`);
  }

  // Ensure trailing slash to safely concatenate relative paths like "login.html"
  return url.endsWith('/') ? url : `${url}/`;
}

/** Convenience method: resolves environment and returns { envName, baseURL }. */
export function resolveEnvironment() {
  const envName = getActiveEnvName();
  const baseURL = getBaseUrlForEnv(envName);
  return { envName, baseURL };
}