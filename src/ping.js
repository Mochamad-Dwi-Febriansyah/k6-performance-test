import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  // summaryTrendStats: ['avg', 'min', 'max', 'p(95)', 'p(99)'],
};

export default function() {
  let res = http.get('http://localhost:3000/ping');
  check(res, { "status is 200": (res) => res.status === 200 });
  // sleep(1);
}
