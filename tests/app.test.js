import { expect } from 'chai';
import request from 'supertest';
import { app } from '../app.js';

describe('GET /', () => {
  it('should render the index page with "Welcome to my cookieshop."', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('Welcome to my cookieshop.');
  });
});

describe('GET /contact', () => {
  it('should return the contact page', async () => {
    const response = await request(app).get('/contact');
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('Get in touch');
  });
});

describe('POST /contact', () => {
  it('should handle contact form submission', async () => {
    const response = await request(app)
      .post('/contact')
      .send({ name: 'John Doe', message: 'Hello!' });
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('Message sent!');
  });
});

describe('GET /about', () => {
  it('should return the about page', async () => {
    const response = await request(app).get('/about');
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('About');
  });
});

describe('GET /search', () => {
  it('should return the search results', async () => {
    const response = await request(app).get('/search').query({ q: 'cookies' });
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('You searched for: cookies');
  });
});

describe('GET /hello', () => {
  it('should return a hello message', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('Hello Joe!');
  });
});

describe('GET /calculate', () => {
  it('should return the average of two numbers', async () => {
    const response = await request(app).get('/calculate');
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('The average of number 23 and 45 is 34');
  });
});

describe('GET /cookies', () => {
  it('should render the cookies page', async () => {
    const response = await request(app).get('/cookies');
    expect(response.status).to.equal(200);
    // Assuming the cookies/index.ejs has some specific content
    expect(response.text).to.contain('Our current offering:'); 
  });
});

describe('GET /cookies/:slug', () => {
  it('should return the detail page of the respective cookie', async () => {
    const response = await request(app).get('/cookies/banana');
    expect(response.status).to.equal(200);
    expect(response.text).to.contain('Price:');
    expect(response.text).to.contain('A cookie with wonderful banana flavour')
  });

  it('should return a 404 page for non-existing cookies', async () => {
    const response = await request(app).get('/cookies/non-existing');
    expect(response.status).to.equal(404);
    expect(response.text).to.contain('Cookie not found')
  });
});
