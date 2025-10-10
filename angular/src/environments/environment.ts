import { Environment } from './environment.model';

export const environment: Environment = {
  production: false,
  apiUrl: 'http://192.168.88.231:8082/api',
  currency: 'Ar',
  defaultauth: 'backend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  }
};
