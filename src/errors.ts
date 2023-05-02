export class NoAuthCodeError extends Error {
  constructor() {
    super('Auth Code is missing, require it via auth url');
  }
}
