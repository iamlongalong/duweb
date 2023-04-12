<template>
  <div class="hello">
    <div>
      请输入要查询的目录: <input type="text" v-model="reqParams.PathName" placeholder="请输入要查询的目录">
    </div>
    <div>
      请输入目录深度: <input type="text" v-model="reqParams.Deep" placeholder="请输入目录深度">
    </div>
    <div>
      请输入每层最大数量: <input type="text" v-model="reqParams.MaxItems" placeholder="请输入每层最大数量">
    </div>
    <div>
      请输入 others 的大小占比: <input type="text" v-model="reqParams.LongTailPercent" placeholder="请输入 others 的大小占比">
    </div>
    <div>
      <input type="button" value="获取详细信息" @click="getDetail">
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {
      reqParams: {
        PathName: "./",
        Deep: 1,
        MaxItems: 5,
        LongTailPercent: 0.95
      }
    };
  },
  methods: {
    ...mapActions(['getDetails']),
    getDetail() {
      console.log(this);
      this.getDetails(this.reqParams);
    }
  }
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
