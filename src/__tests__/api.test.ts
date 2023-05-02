import { extractLocations, getAuthUrl, getToken } from '../api';
import axios from 'axios';
import { getAuthURLEndopoint } from '../urls';
jest.mock('axios');

describe('extractLocations test', () => {
  test('Returns empty array if null events paramenter is passed', () => {
    const locations = extractLocations(null);
    expect(locations).toHaveLength(0);
  });
});

describe('getAuthCode test', () => {
  const originalWindowLocation = window.location;
  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: originalWindowLocation,
    });
  });

  test('Auth Code request is successful', async () => {
    // given
    const response = {
      data: {
        authUrl: 'https://mock.Auth.Url',
      },
    };
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce(response);

    // when
    const url = await getAuthUrl();

    // then
    expect(mockedAxios.get).toHaveBeenCalledWith(getAuthURLEndopoint);
    expect(url).toBe(response.data.authUrl);
  });
});

describe('getToken test', () => {
  beforeAll(() => {
    const localStorageMock = (() => {
      let store: Map<string, string> = new Map();

      return {
        getItem(key: string) {
          return store.get(key);
        },

        setItem(key: string, value: string) {
          store.set(key, value);
        },

        removeItem(key: string) {
          store.delete(key);
        },
      };
    })();

    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });
  test('retrive access token from localstorage', async () => {
    // given
    const expectedAccessToken = 'aaaaaaa';
    localStorage.setItem('access_token', expectedAccessToken);
    global.fetch = jest.fn(() => Promise.resolve({ ok: true })) as jest.Mock;

    // when
    const accessToken = await getToken();

    // then
    expect(accessToken).toBe(expectedAccessToken);
  });
});
