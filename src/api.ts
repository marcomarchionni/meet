import { Schema$Event } from './interfaces/google-interfaces';
import axios from 'axios';
import NProgress from 'nprogress';
import {
  checkTokenBaseEndpoint,
  getAuthURLEndopoint,
  getEventsBaseEndpoint,
  getTokenBaseEndpoint,
} from './urls';
import { NoAuthCodeError } from './errors';
import {
  getEventEndpointResult,
  getTokenEndpointResult,
} from './interfaces/endpointsResults';
import { mockData } from './mock-data';

const isValidToken = async (accessToken: string) => {
  const checkTokenEndpoint = checkTokenBaseEndpoint + accessToken;
  const response = await fetch(checkTokenEndpoint);
  return response.ok;
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

const getTokenFromGoogle = async (code: string) => {
  const getTokenEndpoint = getTokenBaseEndpoint + encodeURIComponent(code);
  const { access_token }: getTokenEndpointResult = await fetch(getTokenEndpoint)
    .then((res) => res.json())
    .catch((error) => error);
  if (access_token) localStorage.setItem('access_token', access_token);
  return access_token;
};

export const getToken = async (): Promise<string> => {
  const accessToken = localStorage.getItem('access_token');
  const tokenIsValid = accessToken && (await isValidToken(accessToken));
  if (tokenIsValid) return accessToken;

  // if token is invalid get token with code
  localStorage.removeItem('access_token');
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code');
  if (code) return getTokenFromGoogle(code);

  // no code is found
  throw new NoAuthCodeError();
};

export const getAuthUrl = async () => {
  try {
    NProgress.start();
    const results = await axios.get(getAuthURLEndopoint);
    const { authUrl }: { authUrl: string } = results.data;
    NProgress.done();
    return (window.location.href = authUrl);
  } catch (error) {
    console.error(error);
  }
};

export const getEvents = async (): Promise<Schema$Event[]> => {
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }
  try {
    NProgress.start();

    if (!navigator.onLine) {
      const data = localStorage.getItem('lastEvents');
      NProgress.done();
      return data ? JSON.parse(data).events : [];
    }

    const token = await getToken();
    if (token) {
      removeQuery();
      const getEventEndpoint = getEventsBaseEndpoint + token;
      const result: getEventEndpointResult = await axios.get(getEventEndpoint);
      if (result.data) {
        const locations = extractLocations(result.data.events);
        localStorage.setItem('lastEvents', JSON.stringify(result.data));
        localStorage.setItem('locations', JSON.stringify(locations));
      }
      NProgress.done();
      return result.data.events;
    }
    NProgress.done();
    return [];
  } catch (error) {
    NProgress.done();
    throw error;
  }
};

export const extractLocations = (
  events: Schema$Event[] | null | undefined,
): string[] => {
  const uniqueAndTruthy = (value: string, index: number, array: string[]) => {
    return value && array.indexOf(value) === index;
  };

  if (!events) return [];
  const locations = events
    .map((event) => event.location || '')
    .filter(uniqueAndTruthy);
  return locations;
};
