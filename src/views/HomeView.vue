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
      </div>

      <div class="g-3 bg-black bg-opacity-10">
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
          v-if="username"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FileList from "@/components/FIleList";
import TextList from "@/components/TextList";
import { Files, Texts } from "@/percival_sdk";
import Swal from "sweetalert2";

export default {
  name: "HomeView",
  components: {
    TextList,
    FileList,
  },
  data() {
    return {
      selected_tab: "file_tab",
      tab_list: ["file_tab", "text_tab", "link_tab", "setting_tab"],
      files: [],
      file: null,
      username: null,
      texts: [],
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
  },
  mounted() {
    this.get_files();
    this.get_texts();
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
</style>
