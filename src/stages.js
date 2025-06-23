import http from 'k6/http';
import { sleep, check } from 'k6';
 
export const options = {
  stages: [
    { duration: '20s', target: 20 }, // ramp up to 10 users over 30 seconds
    { duration: '10s', target: 10 }, // stay at 10 users for 1 minute
    { duration: '20s', target: 0 }, // ramp down to 0 users over 30 seconds
  ],
  // summaryTrendStats: ['avg', 'min', 'max', 'p(95)', 'p(99)'],
}

export default function() {
  let res = http.get('http://localhost:3000/ping');
  check(res, { "status is 200": (res) => res.status === 200 });
  // sleep(1);
}
