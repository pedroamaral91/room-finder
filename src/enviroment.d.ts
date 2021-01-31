declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'test'
    PORT: string
    API_OMNIBEES_URL: string
  }
}
