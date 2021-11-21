import http from 'k6/http';
import { sleep } from 'k6';

//Base Url for the test
// make sure this is not production
export const BASE_URL = 'https://test-api.k6.io';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const req1 = {
    method: 'GET',
    url: `${BASE_URL}/public/crocodiles/1/`,
  };
  const req2 = {
    method: 'GET',
    url: `${BASE_URL}/public/crocodiles/2/`,
  };
  const req3 = {
    method: 'POST',
    url: `${BASE_URL}/public/crocodiles/3/`,
  };  
  const req4 = {
    method: 'POST',
    url: `${BASE_URL}/public/crocodiles/4/`,
  };  

  // call the 4 requests in parallel
  const responses = http.batch([req1, req2, req3, req4]);

  sleep(1);
}