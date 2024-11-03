<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="user-border col-9 col-lg-6">
      <div>
        <div class="user-toolbox">
          <button
            class="btn btn-outline-info m-2"
            id="file_tab"
            @click="select_tab('file_tab')"
          >
            Files
          </button>

          <button
            class="btn btn-outline-secondary m-2"
            id="text_tab"
            @click="select_tab('text_tab')"
          >
            Texts
          </button>

          <button
            class="btn btn-outline-secondary m-2"
            id="link_tab"
            @click="select_tab('link_tab')"
          >
            Links
          </button>

          <button
            class="btn btn-outline-secondary m-2"
            id="setting_tab"
            @click="select_tab('setting_tab')"
          >
            ⚙️
          </button>
        </div>
      </div>

      <div class="mt-3 scrollable-div">
        <div v-if="selected_tab === 'file_tab' && files">
          <FileList
            v-for="file in files"
            :key="file.id"
            :file_name="file.id"
            @click="get_file(file.id)"
          />
        </div>

        <div v-if="selected_tab === 'text_tab'">
          <TextList v-for="text in texts" :key="text.id" :text="text" />
        </div>

        <div v-if="selected_tab === 'link_tab' && links">
          <LinkView v-for="link in links" :key="link.id" :dest="link.dest" />
        </div>

        <div v-if="selected_tab === 'setting_tab'">
          <div v-if="user.username" class="m-3">
            <label class="col m-1" style="color: #f7dc6f">@</label>
            <input class="userpass col-4" type="text" :value="user.username" />
          </div>

          <div v-if="user.password" class="m-3">
            <label class="m-1">🔓</label>
            <input class="userpass" type="text" :value="user.password" />
          </div>
        </div>
      </div>

      <div
        class="g-3 bg-black bg-opacity-10"
        v-if="selected_tab !== 'setting_tab'"
      >
        <input
          type="text"
          class="col-auto form-control-sm m-1 username"
          placeholder="UserName"
          v-model="username"
        />

        <input
          type="text"
          class="col-auto form-control-sm m-1 message-box"
          placeholder="Type Username To Send"
          v-if="!username"
          disabled
        />

        <input
          type="file"
          class="col-auto m-1 custom-file-upload"
          @change="handleFileUpload"
          v-if="username && selected_tab === 'file_tab'"
        />

        <input
          type="text"
          class="col-5 form-control-sm m-1 message-box post-text"
          placeholder="Your Text"
          v-if="username && selected_tab === 'text_tab'"
          v-model="input_text"
        />

        <input
          type="button"
          value=">"
          class="btn btn-outline-success col-auto m-1"
          v-if="selected_tab === 'text_tab' && username"
          @click="send_text"
        />

        <input
          type="text"
          class="col-5 form-control-sm m-1 message-box post-text"
          v-if="selected_tab === 'link_tab' && username"
          placeholder="Insert Your Link Here..."
          v-model="input_link"
        />

        <input
          type="button"
          value=">"
          class="btn btn-outline-success col-auto m-1"
          v-if="selected_tab === 'link_tab' && username && input_link"
          @click="send_link"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FileList from "@/components/FIleList";
import TextList from "@/components/TextList";
import LinkView from "@/components/LinkView";
import { Files, Texts, Links, Users } from "@/percival_sdk";
import Swal from "sweetalert2";

export default {
  name: "HomeView",
  components: {
    TextList,
    FileList,
    LinkView,
  },
  data() {
    return {
      selected_tab: "file_tab",
      tab_list: ["file_tab", "text_tab", "link_tab", "setting_tab"],
      files: [],
      file: null,
      username: null,
      texts: [],
      input_text: null,
      links: [],
      input_link: null,
      user: {
        username: null,
        password: null,
      },
    };
  },
  methods: {
    select_tab(tab_name) {
      let all_tabs = [];
      this.selected_tab = tab_name;
      for (let i of this.tab_list) {
        all_tabs.push(i);
      }
      let index = all_tabs.indexOf(tab_name);
      if (index > -1) {
        all_tabs.splice(index, 1);
        document.getElementById(tab_name).classList.add("btn-outline-info");
        for (let _tab of all_tabs) {
          document.getElementById(_tab).classList.remove("btn-outline-info");
          document.getElementById(_tab).classList.add("btn-outline-secondary");
        }
      }
    },

    get_files() {
      this.$getCredits()
        .then((credits) => {
          let files = new Files(credits.username, credits.password);
          files
            .listFiles()
            .then((files) => {
              this.files = files;
            })
            .catch((err) => {
              // use swal here.
              console.log(err);
            });
        })
        .catch((err) => {
          // create new username and password
          console.log(err);
        });
    },

    get_file(id) {
      this.$getCredits()
        .then((credits) => {
          const files = new Files(credits.username, credits.password);
          files.getFile(id).then((file) => {
            const url = window.URL.createObjectURL(
              new Blob([file], { type: file.type })
            );
            window.open(url);
          });
        })
        .catch((err) => {
          // creante new user
          console.log(err.message);
        });
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.sendFile();
    },

    sendFile() {
      if (this.file) {
        this.$getCredits()
          .then((credits) => {
            const files = new Files(credits.username, credits.password);
            files
              .postFile(this.file, this.username)
              .then((res) => {
                if (res.status >= 400) {
                  Swal.fire({
                    text: res.response.data,
                    icon: "error",
                  });
                } else {
                  Swal.fire({
                    text: "File Sent > " + res[0].user,
                    icon: "success",
                  });
                }
              })
              .catch((err) => {
                Swal.fire({
                  text: err.message,
                  icon: "error",
                });
              });
          })
          .catch((err) => {
            Swal.fire({
              text: err.message,
              icon: "error",
            });
          });
      }
    },

    get_texts() {
      this.$getCredits()
        .then((credits) => {
          let texts = new Texts(credits.username, credits.password);
          texts
            .listTexts()
            .then((res) => {
              // this.texts = res;
              for (let text of res) {
                texts
                  .getText(text.id)
                  .then((oneText) => {
                    this.texts.push(oneText.data);
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }
            })
            .catch((err) => {
              //TODO: here we fucked again
              console.log(err.message);
            });
        })
        .catch((err) => {
          //TODO: here we fuck
          console.log(err.message);
        });
    },

    send_text() {
      this.$getCredits()
        .then((credits) => {
          const texts = new Texts(credits.username, credits.password);
          texts
            .postText(this.input_text, this.username)
            .then((res) => {
              if (res.status >= 400) {
                Swal.fire({
                  text: res.response.data,
                  icon: "error",
                });
              } else {
                Swal.fire({
                  text: "Text Sent > " + res.user,
                  icon: "success",
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                text: err.message,
                icon: "error",
              });
            });
        })
        .catch((err) => {
          //TODO: some fucking thing here
          console.log(err.message);
        });
    },

    get_links() {
      this.$getCredits()
        .then((credit) => {
          const links = new Links(credit.username, credit.password);
          links
            .listLinks()
            .then((res) => {
              // this.links = res;
              for (let link of res) {
                links
                  .getLink(link.id)
                  .then((_link) => {
                    this.links.push(_link);
                  })
                  .catch((err) => {
                    // use swal
                    console.log(err.message);
                  });
              }
            })
            .catch((err) => {
              // use swal
              console.log(err.message);
            });
        })
        .catch();
    },

    send_link() {
      if (!this.$isValidLink(this.input_link)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your Link Is Not Correct!",
        });
        return;
      }
      this.$getCredits()
        .then((credits) => {
          const links = new Links(credits.username, credits.password);
          links
            .postLink(this.input_link, this.username)
            .then((res) => {
              if (res.status >= 400) {
                Swal.fire({
                  text: res.response.data,
                  icon: "error",
                });
              } else {
                Swal.fire({
                  text: "Link Sent > " + res.user,
                  icon: "success",
                });
                this.username = null;
                this.input_link = null;
              }
            })
            .catch((err) => {
              Swal.fire({
                text: err.message,
                icon: "error",
              });
            });
        })
        .catch((err) => {
          //TODO: some fucking thing here
          console.log(err.message);
        });
    },

    add_new_user() {
      let username = this.$usernamer().generate();
      let password = this.$passworder(8).generate();
      let users = new Users(username, password);
      users
        .newUser()
        .then((user) => {
          this.$setCookie("username", username);
          this.$setCookie("password", password);
          this.user.username = username;
          this.user.password = password;
          return user;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    refresh() {
      this.files = [];
      this.texts = [];
      this.links = [];
      this.get_files();
      this.get_texts();
      this.get_links();
    },
  },
  mounted() {
    this.$getCredits()
      .then((user) => {
        this.user.username = user.username;
        this.user.password = user.password;
        this.refresh();
      })
      .catch(() => {
        this.add_new_user();
      });
    setInterval(() => {
      this.refresh();
    }, 5000);
  },
};
</script>

<style scoped>
.user-border {
  border: #2ecc71 1px solid;
  border-top: none;
  height: 400px;
  background-color: #373737;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.user-toolbox {
  background-color: #404040;
}

.scrollable-div {
  height: 65%;
  overflow-y: auto;
}

.scrollable-div::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}

.scrollable-div::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable-div::-webkit-scrollbar-thumb {
  background-color: transparent;
  border: 3px solid #42b983;
  border-radius: 50px;
}

.post-text {
  border: 1px solid #1abc9c;
  color: #ffffff;
  border-radius: 10px;
}

.post-text:active,
.post-text:focus {
  outline: 1px solid #5dade2;
  border: none;
}
</style>
