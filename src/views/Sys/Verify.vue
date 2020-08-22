<template>
  <div class="page-container">
    <!--工具栏  增删改差-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.cname" placeholder="企业名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.phone" placeholder="企业电话"></el-input>
        </el-form-item>
        <el-form-item>
          <el-cascader
            :size="size"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          > </el-cascader>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:verify:view" type="primary"
                     @click="findPage(null)"/>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:verify:add" type="primary"
                     @click="handleAdd"/>
        </el-form-item>
      </el-form>
    </div>

    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <el-form :inline="true" :size="size">
        <el-form-item>
          <el-button-group>
            <el-tooltip content="刷新" placement="top">
              <el-button icon="fa fa-refresh" @click="refresh"></el-button>
            </el-tooltip>
            <el-tooltip content="详情" placement="top">
              <el-button icon="fa fa-filter" @click="getDoubleSelect"></el-button>
            </el-tooltip>
            <el-tooltip content="导出" placement="top">
              <el-button icon="fa fa-file-excel-o" @click="getExcle"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>

    <!--                表格内容栏          内容展示                 -->
    <kt-table permsEdit="sys:verify:edit" permsDelete="sys:verify:delete"
              :data="pageResult" :columns="filterColumns"
              @findPage="findPage"
              @handleEdit="handleEdit"
              @tableCellStyle="tableCellStyle"
              @handleDelete="handleDelete"
              @handleCurrentChange="getSelect"
              >
    </kt-table>


    <el-dialog
      title="认证详情"
      :visible.sync="outerVisible"
      width="30%"
      center>

      <div style="">
        <el-steps :space="200" :active="1" align-center="true" finish-status="success">
          <el-step title="第一阶段"></el-step>
          <el-step title="第二阶段"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="outerVisible = false" size="small">确 定</el-button>
       </span>
    </el-dialog>

  </div>
</template>

<script>
  import KtTable from "@/views/Core/KtTable"
  import KtButton from "@/views/Core/KtButton"
  import {formatDate} from "../../utils/datetime";
  import {format} from "../../utils/datetime";
  import {getUserInfo} from "../../utils/Auth";
  import {formatYYYYMMDD} from "../../utils/datetime";
  import { regionData, CodeToText } from "element-china-area-data";
  export default {
    name: "Verify",
    components: {
      KtTable,
      KtButton,
    },
    data() {
      return {
        size: 'small',
        filters: {
          cname: '',
          phone: ""
        },
        columns: [],
        filterColumns: [
          // {prop: "id", label: "ID", minWidth: 50},
          // {prop: "csCpId", label: "企业编号", minWidth: 120},
          {prop: "csCpName", label: "名称", minWidth: 120},
          // {prop: "csCpLperson", label: "法人", minWidth: 80},
          {prop: "csAddress", label: "地址", minWidth: 200, formatter: this.addressFormat},
          // {prop: "csCpPnum", label: "人数", minWidth: 80},
          // {prop: "csCpAsset", label: "资产(单位:万)", minWidth: 80},
          {prop: "csCpMoney", label: "合同金额", minWidth: 80},
          {prop: "csCpMoneystatus", label: "是否汇款", minWidth: 80,formatter: this.moneystatusFormat},
          {prop: "csCpContractEndtime", label: "合同到期", minWidth: 80,formatter: this.dateFilter},
          {prop: "csCpPhone", label: "联系号码", minWidth: 120},
          {prop: "csCpVfstatus", label: "是否认证", minWidth: 80, formatter: this.statusFormat},
          {prop: "csAddTime", label: "增加时间", minWidth: 125, formatter: this.dateFormat},
          {prop: "csLastTime", label: "修改时间", minWidth: 125, formatter: this.dateFormat},
          {prop: "csCpRemark", label: "备注", minWidth: 120}
        ],
        pageRequest: {page: 1, page_len: 10, cname: "", phone: ""},
        pageResult: {},
        curr:null,
        outerVisible: false,
        cellstyle:"",
        options: regionData,
        selectedOptions: []
      }
    },
    methods: {
      refresh:function(){
        this.curr=null
        this.findPage(null)
      },
      findPage: function (data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.pageRequest.cname = this.filters.cname
        this.pageRequest.phone = this.filters.phone
        this.$api.verify.findPage(this.pageRequest).then((res) => {
          this.pageResult = res.data
        }).then(data != null ? data.callback : '')
      },
      handleAdd(e) {

      },
      getUserExcle(e) {

      },
      handleEdit(e) {

      },
      handleDelete(e) {

      },
      getSelect(e) {
          this.curr=e
      },
      getExcle(){
        let url="http://localhost:8002/verify/getCsCompanyExcel?page=1&page_len=10000" +
          "&cname="+this.filters.cname+
          "&phone="+this.filters.phone
        window.location.href =url
      },
      tableCellStyle(e){
        if(e.cindex==4){
          return "color:blue"
        }else{
          return "color:red"
        }
      },
      getDoubleSelect(e) {
        if(this.curr==null){
          this.$message.error("请选中某一行！")
        }else{
          this.outerVisible = true
        }
      },
      dateFilter:function(row, column, cellValue, index){
        return formatYYYYMMDD(row[column.property])
      },
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property])
      },
      addressFormat: function (row, column, cellValue, index) {
        var address = row["csCpAddress"]
        if (address === null) {
          address = ""
        }
        return row["csCpProv"] + row["csCpCity"] + row["csCpArea"] + address
      },
      statusFormat: function (row, column, cellValue, index) {
        if (format(row[column.property]) == 1) {
          return "无"
        } else {
          return "有"
        }
      },
      moneystatusFormat: function (row, column, cellValue, index) {
        if (format(row[column.property]) == 1) {
          this.cellstyle="color:red"
          return "未到账"
        } else {
          this.cellstyle="color:blue"
          return "已到账"
        }
      },
      handleChange() {
        var loc = "";
        for (let i = 0; i < this.selectedOptions.length; i++) {
          loc += CodeToText[this.selectedOptions[i]];
        }
        alert(loc);
      }
    }
  }
</script>

<style scoped>
    .el-icon-upload{
      width: 100px;
    }
</style>
