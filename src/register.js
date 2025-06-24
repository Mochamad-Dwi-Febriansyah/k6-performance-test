import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s', 
};

export default function() {
  const uniqueId = new Date().getTime(); // Unique ID based on current timestamp
  const body = {
    username: `user${uniqueId}`,
    password: 'rahasia',
    name: `User ${uniqueId}`,
  }
  http.post('http://localhost:3000/api/users', JSON.stringify(body), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const loginBody = {
    username: `user${uniqueId}`,
    password: 'rahasia',
  }

  const response = http.post('http://localhost:3000/api/login', JSON.stringify(loginBody), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  const responseBody = response.json();
  const currentResponse = http.get(`http://localhost:3000/api/users/current`, {
    headers: {
      'Accept': 'application/json', 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${responseBody.token}`,
    },
  });

    const currentBody = currentResponse.json();
}
