import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import querystring from "query-string";

Vue.use(Vuex);

// let server_url = "http://127.0.0.1:8081";
// let server_url = "http://172.17.5.170:8080";

export default new Vuex.Store({
  state: {
    loading: false,
    infos: {},
    url: ""
  },
  mutations: {
    detailed(state, e) {
      state.infos = e;
      console.log("get detailed mutation ", e);
    },
    setUrl(state, e) {
      state.url = e
    },
  },
  actions: {
    getDetails({ state, commit }, e) {
      let defaultParams = { PathName: ".", LongTailPercent: 0.95, Deep: 1, MaxItems: 8 };
      let query = querystring.stringify(Object.assign(defaultParams, e));

      if (state.url == "") {
        alert("must set url !!")
        return
      }

      console.log("dfaldfjlas ", state.url)

      axios.get(`${state.url}/api/v1/info?${query}`).then(res => {
        // commit('toggleLoading');
        // console.log("got info res ", res);
        // state.images = res.data;
        commit('detailed', res.data);
      });
    }
  },
  getters: {
    treeMapData: state => {
      let labels = []
      let parents = []
      let values = []

      function walkPathInfo(node, parentName) {
        labels.push(node.Name)
        parents.push(parentName)
        if (node.Childs.length > 0) {
          values.push(0)
        } else {
          values.push(node.SizeKB)
        }

        if (!node.Childs) {
          node.Childs = []
        }
        if (node.Childs.length > 0) {
          node.Childs.forEach(el => {
            walkPathInfo(el, node.Name)
          });
        }
      }

      // console.log(state.infos)
      walkPathInfo(state.infos, "")

      let data = [{
        type: "treemap",
        labels: labels,
        parents: parents,
        values: values,
        textinfo: "label+value+percent parent+percent entry",
        // domain: { "x": [0, 0.48] },
        outsidetextfont: { "size": 20, "color": "#377eb8" },
        marker: { "line": { "width": 1 } },
        pathbar: { "visible": false }
      }]
      return data
    }
  }
});

