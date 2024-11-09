let axios = require("axios");

exports.base_down_url = "https://api.percival.wiregeek.ir/api";

class PercivalBase {
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.auth = {
      username: this.username,
      password: this.password,
    };
    this.percival_api = "https://api.percival.wiregeek.ir";
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

  postFile(file, username) {
    const formDate = new FormData();
    formDate.append("files", file);
    return axios
      .post(this.percival_api + `/?toUser=${username}`, formDate, {
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

exports.Texts = class extends PercivalBase {
  constructor(username, password) {
    super(username, password);
    this.percival_api = this.percival_api + "/api/text/";
  }

  listTexts() {
    return axios
      .get(this.percival_api, { auth: this.auth })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }

  getText(id) {
    return axios
      .get(this.percival_api + `/${id}/`, { auth: this.auth })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }

  postText(text, usernmae) {
    const data = {
      text: text,
      username: usernmae,
    };
    return axios
      .post(this.percival_api, data, { auth: this.auth })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
};

exports.Links = class extends PercivalBase {
  constructor(username, password) {
    super(username, password);
    this.percival_api = this.percival_api + "/api/link/";
  }

  listLinks() {
    return axios
      .get(this.percival_api, { auth: this.auth })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }

  getLink(id) {
    return axios
      .get(this.percival_api + `/${id}/`, { auth: this.auth })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }

  postLink(dest, usernmae) {
    const data = {
      dest: dest,
      username: usernmae,
    };
    return axios
      .post(this.percival_api, data, { auth: this.auth })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  }
};

exports.Users = class extends PercivalBase {
  constructor(username, password) {
    super(username, password);
    this.percival_api = this.percival_api + "/api/user/";
  }

  newUser() {
    return axios
      .post(this.percival_api, {
        username: this.username,
        password: this.password,
      })
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        return err;
      });
  }
};
