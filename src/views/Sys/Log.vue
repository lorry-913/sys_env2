<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.ip" placeholder="ip地址"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:log:view" type="primary" @click="findPage(null)"/>
        </el-form-item>
      </el-form>
    </div>

    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <el-form :inline="true" :size="size">
        <el-form-item>
          <el-button-group>
            <el-tooltip content="刷新" placement="top">
              <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
            </el-tooltip>
            <el-tooltip content="导出" placement="top">
              <el-button icon="fa fa-file-excel-o" @click="getLoggerExcle"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <!--表格内容栏-->
    <kt-table :height="350"
              :data="pageResult" :columns="columns" :showOperation="showOperation" @findPage="findPage">
    </kt-table>
  </div>
</template>

<script>
  import KtTable from "@/views/Core/KtTable"
  import KtButton from "@/views/Core/KtButton"
  import { format } from "@/utils/datetime"
  export default {
    components: {
      KtTable,
      KtButton
    },
    data() {
      return {
        size: 'small',
        filters: {
          ip: ''
        },
        columns: [
          {prop:"id", label:"ID", minWidth:60},
          {prop:"userName", label:"用户名", minWidth:100},
          // {prop:"operation", label:"操作", minWidth:120},
          {prop:"method", label:"方法", minWidth:180},
          {prop:"params", label:"参数", minWidth:220},
          {prop:"ip", label:"IP", minWidth:120},
          {prop:"time", label:"耗时", minWidth:80},
          {prop:"createBy", label:"创建人", minWidth:100},
          {prop:"createTime", label:"创建时间", minWidth:120, formatter:this.dateFormat}
          // {prop:"lastUpdateBy", label:"更新人", minWidth:100},
          // {prop:"lastUpdateTime", label:"更新时间", minWidth:120, formatter:this.dateFormat}
        ],
        pageRequest: {page: 1, page_len: 10,ip:""},
        pageResult: {},
        showOperation:false
      }
    },
    methods: {
      // 获取分页数据
      findPage: function (data) {
        if(data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest.ip = this.filters.ip
        this.$api.log.findPage(this.pageRequest).then((res) => {
          this.pageResult = res.data
        }).then(data!=null?data.callback:'')
      },
      // 时间格式化
      dateFormat: function (row, column, cellValue, index){
        return format(row[column.property])
      },
      getLoggerExcle(){
        let url="http://localhost:8002/logger/getLoggerExcel?page=1&page_len=10000"
        if(this.filters.ip!="") url=url+"&ip="+this.filters.ip
        window.location.href =url
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
