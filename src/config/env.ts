const currentEnv: string = import.meta.env.MODE;
export const localBaseUrl = {
  'dev': '/public/',
  'test': '/',
  'prod': '/'
}[currentEnv]