var b = new bm(123, "dev");
b.scoreGet(
  function (data) {
    console.log(data);
  }, function (e) {
    throw new Error(e);
  }
);

b.scorePost(
  1000,
  function (data) {
    console.log(data);
  }, function (e) {
    throw new Error(e);
  }
);

b.achievementGet(
  1000,
  function (data) {
    console.log(data);
  }, function (e) {
    throw new Error(e);
  }
);

b.achievementUpdate(
  1000,
  1000,
  function (data) {
    console.log(data);
  }, function (e) {
    throw new Error(e);
  }
);
