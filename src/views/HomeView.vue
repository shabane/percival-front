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
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
        <FileList file_name="hiarya" dest="/link" />
      </div>
    </div>
  </div>
</template>

<script>
import FileList from "@/components/FIleList";

export default {
  name: "HomeView",
  components: {
    FileList,
  },
  data() {
    return {
      selected_tab: "files",
      tab_list: ["file_tab", "text_tab", "link_tab", "setting_tab"],
    };
  },
  methods: {
    select_tab(tab_name) {
      let all_tabs = [];
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
