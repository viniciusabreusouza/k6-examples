import http from 'k6/http';
import { sleep, check } from 'k6';

//Base Url for the test
// make sure this is not production
export const BASE_URL = 'https://test-api.k6.io';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<250'], // 95% of requests should be below 250ms
  },
  stages: [
    { duration: '30s', target: 20 },   // simulate ramp-up of traffic from 1 to 20 users over 30 seconds.
    { duration: '1m30s', target: 10 }, // ramp-down to 10 users over 1 min and 30 sec
    { duration: '20s', target: 0 },    // ramp-down to 0 users
  ],
};

export default function () {

  const res = http.get(`${BASE_URL}/public/crocodiles/1/`);

  check(res, { 'status was 200': (r) => r.status == 200 });

  if(res.timings.duration > 250)
    console.log('The response is longer than expected - Response time was ' + String(res.timings.duration) + ' ms');

  sleep(1);
}
