/*
module.exports = {
  url: "http://example.com",
  envs: ["dev", "stage", "production"],
  endpoint: {
    "postScore": "/api/v1/postScore",
    "getScore": "/api/v1/getScore",
    "updateAchievement": "/api/v1/updateAchievement",
    "getAchievement": "/api/v1/getAchievement"
  }
};
*/
module.exports = {
  url: "http://localhost:8000/test",
  envs: ["dev", "stage", "production"],
  endpoint: {
    "postScore": "/fixture/postScore.json",
    "getScore": "/fixture/getScore.json",
    "updateAchievement": "/fixture/updateAchievement.json",
    "getAchievement": "/fixture/getAchievement.json"
  }
};
