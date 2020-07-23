const request = require('supertest');
const app = require('../src/app');
const { set } = require('../src/app');

describe('GET', () => {
  it('should serve the static html and css files', (done) => {
    request(app)
      .get('/')
      .expect('Content-type', /text\/html/)
      .expect(/POST\-IT/, done);
  });
});

describe('GET /', () => {
  it('should serve sign in page if not signed in', (done) => {
    request(app)
      .get('/')
      .expect('Content-type', /text\/html/)
      .expect(/POST\-IT/, done);
  });
  it('should serve dashboard if signed in', (done) => {
    app.locals.sessions = { '1234': 'Phaneendra' };
    request(app)
      .get('/')
      .set('Cookie', 'sId=1234')
      .expect(/Phaneendra/, done);
  });
});

describe('POST /publish', () => {
  app.locals.sessions = { '1234': 'Phaneendra' };
  const data = {
    title: 'my title',
    content: {
      time: 1552744582955,
      blocks: [
        {
          type: 'text',
          data: {
            text:
              'https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg',
          },
        },
      ],
      version: '2.11.10',
    },
  };
  it('Should publish the post', (done) => {
    request(app)
      .post('/user/publish')
      .set('Cookie', 'sId=1234')
      .set('Content-type', 'application/json')
      .send(JSON.stringify(data))
      .expect('Published')
      .expect(200, done);
  });
});