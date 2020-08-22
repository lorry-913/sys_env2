<template>
  <div class="page-container">
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="模板名称"></el-input>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" :label="$t('action.search')" perms="sys:verifyfile:view" type="primary"
                     @click="getAllFT"/>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" :label="$t('action.add')" perms="sys:verifyfile:add" type="primary"
                     @click="handleAdd"/>
        </el-form-item>
      </el-form>
    </div>

    <!--文件表格-->
    <el-table :data="tabledata" stripe size="mini" style="width: 100%;"
              v-loading="loading" rowKey="id" element-loading-text="$t('action.loading')">
      <el-table-column
        prop="csFtName" header-align="center" align="center" width="500"
        :show-overflow-tooltip="true" label="模板名称">
      </el-table-column>
      <el-table-column
        prop="addtime" header-align="center" align="center" width="200"
        :show-overflow-tooltip="true" label="添加时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="lasttime" header-align="center" align="center" width="200"
        label="修改时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="csFtUrl" header-align="center" align="center" width="100"
         label="模板下载">
        <template slot-scope="scope">
          <kt-button icon="el-icon-download" :label="$t('action.down')"
                     perms="sys:verifyfile:down"
                     style="border:none;background: none"
                     @click="handleDown(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right" header-align="center" align="center" width="250" :label="$t('action.operation')">
        <template slot-scope="scope">
          <kt-button icon="fa fa-edit" :label="$t('action.edit')" perms="sys:verifyfile:edit"
                     @click="handleEdit(scope.row)"/>
          <kt-button icon="fa fa-trash" :label="$t('action.delete')" perms="sys:verifyfile:delete" type="danger"
                     @click="handleDelete(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog
      title="模板上传"
      :visible.sync="outerVisible"
      width="400px"
    >
      <div>
        <el-upload
          class="upload-demo up"
          drag
          ref="upload"
          action="http://localhost:8002/fileTemp/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :headers="headers"
          :file-list="fileList"
          :with-credentials="true"
          multiple
          :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <el-button style="width: 360px" size="small" type="primary" plain @click="submitUpload">上传到服务器</el-button>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="outerVisible = false" size="small">确 定</el-button>
       </span>
    </el-dialog>

  </div>
</template>

<script>
  import {format} from "@/utils/datetime"
  import KtButton from "@/views/Core/KtButton"
  import {getToken} from "../../utils/Auth";

  export default {
    name: "Verifyfile",
    data() {
      return {
        size: 'small',
        loading: false,
        filters: {
          name: "",
        },
        tabledata: [],
        curr: {},
        outerVisible: false,
        fileList: [],
        headers: {
          Authorization: getToken()  //从cookie里获取token，并赋值  Authorization ，而不是token
        },
      }
    },
    components: {
      KtButton,
    },
    methods: {
      getAllFT: function () {
        let params = {
          name: this.filters.name
        }
        this.$api.verifyfile.getAllFileTemp(params).then((res) => {
          this.tabledata = res.data
        })
      },
      handleAdd(e) {
        this.outerVisible = true
      },
      handleEdit(e) {

      },
      handleDelete(e) {
        this.$api.verifyfile.deleteFileTemp(e).then(res => {
          if (res.code == 0) {
            this.$message.info("删除成功")
            this.getAllFT()
          } else {
            this.$message.error("删除失败")
          }
        })
      },
      handleDown(e) {
        let url = "http://localhost:8002/fileTemp/download?fileName="
        url = url + e.csFtUrl
        window.location.href = url
      },
      // 时间格式化
      dateFormat: function (row, column, cellValue, index) {
        return format(row[column.property])
      },
      submitUpload(e) {
        this.$refs.upload.submit();
        // this.$api.verifyfile.upFileTemp(this.fileList).then(res=>{
        //
        // })
      },
      handleRemove(file, fileList) {
        alert(this.fileList)
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
        // this.fileList.push(file)
      }
    },
    mounted() {
      this.getAllFT()
    }
  }
</script>

<style scoped lang="scss">
  .up > > > .el-upload > > > .el-upload-dragger {
    width: 200px !important;
    height: 200px !important;
  }
</style>
