const CONSOLE_WARNING_COLOR = '\x1b[33m%s\x1b[0m';

export const warnIfEquals = (property: any, value: any, message: string): void => {
  if (property === value) {
    warn(message);
  }
};

export const warnIfNotEquals = (property: any, value: any, message: string): void => {
  if (property && property !== value) {
    warn(message);
  }
};

const warn = (message: string): void => {
  console.warn(CONSOLE_WARNING_COLOR, `### ${message}`);
};
