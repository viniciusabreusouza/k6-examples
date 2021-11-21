import http from 'k6/http';
import { sleep, check } from 'k6';

//Base Url for the test
// make sure this is not production
export const BASE_URL = 'https://test-api.k6.io';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  stages: [
    { duration: '30s', target: 20 }, // Linearly ramp up from 1 to 20 VUs during first 30 seconds
    { duration: '1m30s', target: 10 }, // Ramp-down from 20 to 10 VUs for 1m30s
    { duration: '20s', target: 0 }, // Ramp-down from 10 to 0 VUs for 0s
  ],
};

export default function () {

  const res = http.get(`${BASE_URL}/public/crocodiles/1/`);

  check(res, { 'status was 200': (r) => r.status == 200 });

  sleep(1);
}