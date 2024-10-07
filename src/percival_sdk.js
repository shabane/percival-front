let axios = require("axios");

class PercivalBase {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.auth = {
      username: this.username,
      password: this.password,
    };
    this.percival_api = "http://127.0.0.1:3000";
  }
}

exports.Files = class extends PercivalBase {
  constructor(username, password) {
    super(username, password);
    this.percival_api = this.percival_api + "/api/file/";
  }

  listFiles() {
    return axios
      .get(this.percival_api, { auth: this.auth })
      .then((files) => {
        return files.data;
      })
      .catch((err) => {
        return err;
      });
  }
};
