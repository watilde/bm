describe('testing bm.js', function() {
  var b;
  var head = {'Content-Type': 'text/json'};
  var userId = 1000;
  before(function(done) {
    b = new bm(userId, "dev");
    done();
  });
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();
    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });
  afterEach(function() {
    this.xhr.restore();
    this.requests = [];
  });

  it('have to get score data', function (done) {
    var data = {
      score: 100, timestamp: 201507181513
    };
    var body = JSON.stringify(data);
    b.scoreGet(function (data) {
      assert(typeof data.score, "number");
      assert(typeof data.timestamp, "number");
      done();
    }, function (e) {});
    this.requests[0].respond(200, head, body);
  });

  it('have to post score data', function (done) {
    var data = {
      "message": "Updated user’s score",
      "status": true
    };
    var body = JSON.stringify(data);
    b.scoreGet(function (data) {
      assert(typeof data.message, "string");
      assert(typeof data.status, "string");
      done();
    }, function (e) {});
    this.requests[0].respond(200, head, body);
  });

  it('have to get achievement data', function (done) {
    var achievementId = 100;
    var data = {
      "stepsComplete": 10,
      "stepsTotal": 10
    };
    var body = JSON.stringify(data);
    b.achievementGet(achievementId, function (data) {
      assert(typeof data.stepsComplete, "number");
      assert(typeof data.stepsTotal, "number");
      done();
    }, function (e) {});
    this.requests[0].respond(200, head, body);
  });

  it('have to update achievement data', function (done) {
    var achievementId = 100;
    var stepsComplete = 100;
    var data = {
      "message": "Updated user’s achievement",
      "status": true
    };
    var body = JSON.stringify(data);
    b.achievementUpdate(achievementId, stepsComplete, function (data) {
      assert(typeof data.message, "string");
      assert(typeof data.status, "string");
      done();
    }, function (e) {});
    this.requests[0].respond(200, head, body);
  });
});
