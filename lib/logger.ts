/**
 * Logger utility for the application
 * 
 * In development: Logs everything to console
 * In production: Only logs errors, sends to Sentry for tracking
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Dynamically import Sentry only in production and when available
let Sentry: typeof import("@sentry/nextjs") | null = null;
if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
  try {
    // Server-side: direct import
    if (typeof window === 'undefined') {
      Sentry = require("@sentry/nextjs");
    }
  } catch (e) {
    // Sentry not available, continue without it
  }
}

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  }

  /**
   * Log info messages (only in development)
   */
  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, context || '');
    }
  }

  /**
   * Log warning messages (always logged)
   */
  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, context || '');
    } else {
      // In production, could send to monitoring service
      // For now, silently handle warnings in production
    }
  }

  /**
   * Log error messages (always logged)
   * In production, these are sent to Sentry for error tracking
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorDetails = error instanceof Error 
      ? { message: error.message, stack: error.stack, name: error.name }
      : error;

    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, errorDetails || '', context || '');
    } else {
      // In production, log to console
      console.error(`[ERROR] ${message}`, errorDetails || '', context || '');
      
      // Send to Sentry for error tracking
      try {
        if (typeof window !== 'undefined') {
          // Client-side: use window.Sentry if available
          const clientSentry = (window as any).Sentry;
          if (clientSentry) {
            if (error instanceof Error) {
              clientSentry.captureException(error, { 
                extra: context, 
                tags: { message } 
              });
            } else {
              clientSentry.captureMessage(message, { 
                level: 'error', 
                extra: { error, ...context } 
              });
            }
          }
        } else if (Sentry) {
          // Server-side: use imported Sentry
          if (error instanceof Error) {
            Sentry.captureException(error, { 
              extra: context, 
              tags: { message } 
            });
          } else {
            Sentry.captureMessage(message, { 
              level: 'error', 
              extra: { error, ...context } 
            });
          }
        }
      } catch (e) {
        // Silently fail if Sentry is not available or configured
        // This ensures the app doesn't break if Sentry fails
      }
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for testing purposes
export { Logger };
