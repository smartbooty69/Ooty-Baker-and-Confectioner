/**
 * Logger utility for the application
 * 
 * In development: Logs everything to console
 * In production: Only logs errors, can be extended to send to external services
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

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
   * In production, these should be sent to error tracking service
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorDetails = error instanceof Error 
      ? { message: error.message, stack: error.stack, name: error.name }
      : error;

    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, errorDetails || '', context || '');
    } else {
      // In production, send to error tracking service (e.g., Sentry)
      // For now, log to console but could be extended
      console.error(`[ERROR] ${message}`, errorDetails || '', context || '');
      
      // TODO: Integrate with error tracking service in production
      // Example: Sentry.captureException(error, { extra: context });
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for testing purposes
export { Logger };
