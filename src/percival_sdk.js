let axios = require("axios");

exports.base_down_url = "http://127.0.0.1:3000/api";

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

  getFile(id) {
    return axios({
      url: this.percival_api + id,
      method: "GET",
      responseType: "blob",
      auth: this.auth,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  postFile(file) {
    const formDate = new FormData();
    formDate.append("files", file);
    return axios
      .post(this.percival_api, formDate, {
        auth: this.auth,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
};
