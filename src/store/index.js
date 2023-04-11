import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import querystring from "query-string";

Vue.use(Vuex);

let server_url = "http://127.0.0.1:8080"

export default new Vuex.Store({
  state: {
    loading: false,
    infos: [],
  },
  mutations: {
    detailed(state, e) {
      state.infos.push(e)
      console.log("get detailed mutation ", e);
    }
  },
  actions: {
    getDetails({ state, commit }, e = {"PathName": "", "LongTailPercent": 0.95, "Deep": 1, "MaxItems": 8}) {
      
      debugger
      let query = querystring.stringify(e)
      
      
      axios.get(`${server_url}/api/v1/info?${query}`).then(res => {
        // commit('toggleLoading');
        console.log("got info res ", res);
        // state.images = res.data;
        commit('detailed', res.data);
      });
    }
  }
});
