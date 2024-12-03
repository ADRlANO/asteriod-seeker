declare namespace NodeJS {
  interface ProcessEnv {
    readonly JWT_SECRET: string;
    readonly NASA_API_KEY: string;
  }
}
