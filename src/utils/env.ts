/**
 * Environment validation utility
 * Ensures all required environment variables are set and valid
 */

interface EnvVarConfig {
  name: string;
  required: boolean;
  validator?: (value: string) => boolean;
  defaultValue?: string;
}

const ENV_CONFIG: EnvVarConfig[] = [
  {
    name: 'GEMINI_API_KEY',
    required: false, // Optional for this app since it's client-side only
    validator: (value) => value.length > 0,
  },
  {
    name: 'APP_URL',
    required: false,
    validator: (value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    defaultValue: 'http://localhost:3000',
  },
  {
    name: 'NODE_ENV',
    required: false,
    validator: (value) => ['development', 'production', 'test'].includes(value),
    defaultValue: 'development',
  },
];

export function validateEnv(): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  ENV_CONFIG.forEach((config) => {
    const value = import.meta.env[config.name] || process.env[config.name];

    if (!value && config.required) {
      errors.push(`Required environment variable ${config.name} is missing`);
      return;
    }

    if (!value && config.defaultValue) {
      // Set default value
      if (typeof process !== 'undefined' && process.env) {
        process.env[config.name] = config.defaultValue;
      }
      warnings.push(`Using default value for ${config.name}: ${config.defaultValue}`);
      return;
    }

    if (value && config.validator && !config.validator(value)) {
      errors.push(`Environment variable ${config.name} has invalid value: ${value}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function getEnvVar(name: string): string {
  const value = import.meta.env[name] || process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

export function getEnvVarWithDefault(name: string, defaultValue: string): string {
  return import.meta.env[name] || process.env[name] || defaultValue;
}
