<template>
  <div class="hello">
    <div>
    服务器地址:
      <input type="text" v-on:blur="changeURL" v-model="url" placeholder="请输入服务器地址">
    </div>
    <div>
    要查询的目录:
      <input
        type="text"
        v-model="reqParams.PathName"
        placeholder="请输入要查询的目录"
      />
    </div>
    <div>
    目录深度:
      <input
        type="text"
        v-model="reqParams.Deep"
        placeholder="请输入目录深度"
      />
    </div>
    <div>
    每层最大数量:
      <input
        type="text"
        v-model="reqParams.MaxItems"
        placeholder="请输入每层最大数量"
      />
    </div>
    <div>
    主体比例:
      <input
        type="text"
        v-model="reqParams.LongTailPercent"
        placeholder="请输入 others 的大小占比"
      />
    </div>
    <br>
    <div>
      <input type="button" value="获取详细信息" @click="getDetail" />
      <input type="button" value="展示 treemap" @click="getTreeMapData" />
    </div>
    <div>
      <!-- {{ treeMapData }} -->
    </div>
    <div id="diskinfo_plotly_block"></div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import plotly from "plotly.js-dist";

export default {
  name: "HelloWorld",
  data() {
    return {
      reqParams: {
        PathName: "./",
        Deep: 1,
        MaxItems: 5,
        LongTailPercent: 0.95,
      },
      url: ""
    };
  },
  computed: {
    ...mapGetters(["treeMapData"]),
  },
  methods: {
    ...mapActions(["getDetails"]),
    ...mapMutations(["setUrl"]),
    getDetail() {
      // console.log(this);
      this.getDetails(this.reqParams);      
    },
    changeURL(e) {
      // console.log("xxx : ", this.url)
      this.setUrl(this.url)
    },
    getTreeMapData() {
      // console.log("??????", this.treeMapData);

      plotly.newPlot("diskinfo_plotly_block", this.treeMapData);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
