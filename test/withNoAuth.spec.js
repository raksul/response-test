var agent = chai.request.agent(globals.baseUrl);

describe(`Response Testing with No Auth - base url: ${globals.baseUrl}`, () => {
  // basic を設定する
  before((done) => {
    agent.get('/')
      .auth(globals.basicAuth.username, globals.basicAuth.password)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  // 認証無しでページが表示することを確認する
  globals.urls.withoutAuth.forEach((path) => {
    it(`GET ${path}`, (done) => {
       agent.get(path)
        .end((err, res)=>{
          res.should.have.status(200);
          done();
        });
    });
  });

  // 認証無しの場合リダイレクトする
  globals.urls.withAuth.forEach((path) => {
    it(`Redirect /login if a client GET ${path} with no auth`, (done) => {
      agent.get(path)
        .end((err, res)=>{
          res.should.redirect;
          done();
        });
    });
  });
});
