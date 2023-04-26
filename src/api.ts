import { Schema$Event } from './interfaces/google-interfaces';
import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';
import {
  checkTokenBaseEndpoint,
  getAuthURLEndopoint,
  getEventsBaseEndpoint,
  getTokenBaseEndpoint,
} from './urls';

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
  const { access_token } = await fetch(getTokenEndpoint)
    .then((res) => res.json())
    .catch((error) => error);
  if (access_token) localStorage.setItem('access_token', access_token);
  return access_token;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenIsValid = accessToken ? await isValidToken(accessToken) : false;

  if (!tokenIsValid) {
    localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await axios.get(getAuthURLEndopoint);
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getTokenFromGoogle(code);
  }
  return accessToken;
};

interface resultType {
  data: {
    events: Schema$Event[];
  };
}

export const getEvents = async (): Promise<Schema$Event[]> => {
  NProgress.start();
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }
  if (!navigator.onLine) {
    const data = localStorage.getItem('lastEvents');
    NProgress.done();
    return data ? JSON.parse(data).events : [];
  }
  const token = await getAccessToken();
  if (token) {
    removeQuery();
    const getEventEndpoint = getEventsBaseEndpoint + token;
    const result: resultType = await axios.get(getEventEndpoint);
    if (result.data) {
      const locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
  return [];
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
