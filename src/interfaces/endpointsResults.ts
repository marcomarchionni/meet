import { Schema$Event } from './google-interfaces';

export interface getTokenEndpointResult {
  access_token: string;
}

export interface getEventEndpointResult {
  data: {
    events: Schema$Event[];
  };
}
