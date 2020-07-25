const Database = require('../src/database');
const assert = require('assert');

describe('addPost', () => {
  it('should give error if database failure', (done) => {
    const db = { run: (query, callback) => callback('error') };
    const database = new Database(db);
    database.addPost({ id: 1, title: 'title', content: { time: '1' } }, 2)
      .then(null, (actual) => {
        assert.equal(actual, 'error');
        done();
      })
  })

  it('should add the post to database', (done) => {
    const db = { run: (query, callback) => callback(null, true) };
    const database = new Database(db);
    database.addPost({ id: 1, title: 'title', content: { time: '1' } }, 2)
      .then((actual) => {
        assert.ok(actual)
        done();
      }, null)
  })
});

describe('getPost', () => {
  it('should give error if database failure', (done) => {
    const db = { get: (query, callback) => callback('error') };
    const database = new Database(db);
    database.getPost(2)
      .then(null, (actual) => {
        assert.equal(actual, 'error');
        done();
      })
  });

  it('should get the post from database', (done) => {
    const db = { get: (query, callback) => callback(null, true) };
    const database = new Database(db);
    database.getPost(2)
      .then((actual) => {
        assert.ok(actual)
        done();
      }, null)
  })
});

describe('getUserById', () => {
  it('should give error if database failure', (done) => {
    const db = { get: (query, callback) => callback('error') };
    const database = new Database(db);
    database.getUserById(2)
      .then(null, (actual) => {
        assert.equal(actual, 'error');
        done();
      })
  });

  it('should get the user details of given id', (done) => {
    const db = { get: (query, callback) => callback(null, { username: 'ramu' }) };
    const database = new Database(db);
    database.getUserById(2)
      .then((actual) => {
        assert.deepStrictEqual(actual, { username: 'ramu' });
        done();
      }, null)
  })
});

describe('addUser', () => {
  it('should give error if database failure', (done) => {
    const db = { run: (query, callback) => callback('error') };
    const database = new Database(db);
    database.addUser({ login: 'kaka', avatar_url: 'https://img.com' })
      .then(null, (actual) => {
        assert.equal(actual, 'error');
        done();
      })
  });

  it('should add the given user details to users table and return true', (done) => {
    const db = { run: (query, callback) => callback(null, true) };
    const database = new Database(db);
    database.addUser({ login: 'kaka', avatar_url: 'https://img.com' })
      .then((actual) => {
        assert.ok(actual)
        done();
      }, null)
  })
});

describe('getUser', () => {
  it('should give error if database failure', (done) => {
    const db = { get: (query, params, callback) => callback('error') };
    const database = new Database(db);
    database.getUser('mama')
      .then(null, (actual) => {
        assert.equal(actual, 'error');
        done();
      })
  });

  it('should get user details of given id', (done) => {
    const db = { get: (query, params, callback) => callback(null, { user_id: 7 }) };
    const database = new Database(db);
    database.getUser('mama')
      .then((actual) => {
        assert.deepStrictEqual(actual, { user_id: 7 });
        done();
      }, null)
  });

  it('should return false if user id doesn\'t exist', (done) => {
    const db = { get: (query, params, callback) => callback(null, null) };
    const database = new Database(db);
    database.getUser('mama')
      .then((actual) => {
        assert.equal(actual, false)
        done();
      }, null)
  })
});


describe('getLatestPosts', () => {
  it('should give error if database failure', (done) => {
    const db = { all: (query, callback) => callback('error') };
    const database = new Database(db);
    database.getLatestPosts(5)
      .then(null, (actual) => {
        assert.equal(actual, 'error');
        done();
      })
  });

  it('should get the latest posts', (done) => {
    const db = { all: (query, callback) => callback(null, [{ username: 'ramu', id: 7 }]) };
    const database = new Database(db);
    database.getLatestPosts(5)
      .then((actual) => {
        assert.deepStrictEqual(actual, [{ username: 'ramu', id: 7 }]);
        done();
      }, null)
  })
});