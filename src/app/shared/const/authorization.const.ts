import { HttpHeaders } from '@angular/common/http';

const BEARER_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmVjZTA3M2IyOWI3ZmUxNTE4ZDNhNDdjNjA2ZTY5MCIsInN1YiI6IjY0ZGViNzU1ZTE5ZGU5MDBlMzQyNmE4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PpmFtn4cU4VvvqZyhIfJ2e7gnnqDnAqLo1H1dR_qqK4';

export const AUTHORIZATION_HEADER = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ` + BEARER_TOKEN,
  }),
};
