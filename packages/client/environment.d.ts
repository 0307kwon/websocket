declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [index: string]: string;
    }
  }
}

export {};
