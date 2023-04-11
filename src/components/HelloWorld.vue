<template>
  <div class="hello">
    <input type="text" v-model="path" placeholder="请输入要查询的目录">
    <input type="button" value="获取详细信息" @click="getDetail">
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  data () {
    return {
      path: "./",
    }
  },
  methods: {
    ...mapActions(['getDetails']),
    getDetail() {
      this.getDetails({PathName: "./"})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
