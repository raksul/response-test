var agent = chai.request.agent(globals.baseUrl);

describe(`Response Testing with Auth - base url: ${globals.baseUrl}`, () => {
  before((done) => {
    agent
      .get(globals.urls.login)
      .then((res) => {
        agent.post(globals.urls.login)
          .auth(globals.basicAuth.username, globals.basicAuth.password)
          .type('form')
          .send(globals.loginAuth)
          .then((res) => {
            res.should.have.status(200);
            console.log("Login before testing");
            done();
          });
      });
  });

  globals.urls.withAuth.forEach((path) => {
    it(`GET ${path}`, (done) => {
      agent.get(path)
        .end((err, res)=>{
          res.should.have.status(200);
          done();
        });
    });
  });
});
