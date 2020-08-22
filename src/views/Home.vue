<template>
  <div class="page">
    <nav-bar></nav-bar>
    <head-bar></head-bar>
    <main-content></main-content>
    <!--<h2>Home Page</h2>-->
    <!--&lt;!&ndash;国际化&ndash;&gt;-->
    <!--<h3>{{$t("common.doc")}}</h3>-->
    <!--<el-button type="success" @click="changeLanguage('zh_cn')">简体中文</el-button>-->
    <!--<el-button type="success" @click="changeLanguage('en_us')">English</el-button>-->
  </div>
</template>

<script>
import HeadBar from "./HeadBar"
import NavBar from "./NavBar"
import MainContent from "./MainContent"
import { mapState } from 'vuex'


export default {
  name: 'Home',
  components: {
    HeadBar,
    NavBar,
    MainContent
  },

  methods: {
    // 语言切换
    changeLanguage(lang) {
      lang === '' ? 'zh_cn' : lang
      this.$i18n.locale = lang
      this.langVisible = false
    },
    testAxios() {
      this.$api.user.getUser().then(res=>{
        // alert(res)
      })
    },
    getUser() {

    },

  },

}
</script>
