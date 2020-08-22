<template>
  <div class="personal-panel">
    <div class="personal-desc" :style="{'background':this.$store.state.app.themeColor}">
      <div class="avatar-container">
        <img class="avatar" :src="require('@/assets/user.png')"/>
      </div>
      <div class="name-role">
        <span class="sender">{{ user.name }} - {{ user.role }}</span>
      </div>
      <div class="registe-info">
          <span class="registe-info">
            <li class="fa fa-clock-o"></li>
            {{ user.registeInfo }}
          </span>
      </div>
    </div>
    <!--<div class="personal-relation">-->
    <!--<span class="relation-item">followers</span>  -->
    <!--<span class="relation-item">watches</span>  -->
    <!--<span class="relation-item">friends</span>-->
    <!--</div>-->
    <div class="main-operation">
        <span class="main-operation-item">
          <el-button size="small" icon="fa fa-male" @click="getPersonInfo"> 个人中心</el-button>
        </span>
      <span class="main-operation-item">
          <el-button size="small" icon="fa fa-key" @click="changePwd=true"> 修改密码</el-button>
        </span>
    </div>
    <div class="other-operation">
      <div class="other-operation-item">
        <li class="fa fa-user"></li>
        在线人数
      </div>
      <div class="other-operation-item">
        <li class="fa fa-bell"></li>
        访问次数
      </div>
      <div class="other-operation-item">
        <li class="fa fa-undo"></li>
        {{$t("common.backupRestore")}}
      </div>
    </div>
    <div class="personal-footer" @click="logout">
      <li class="fa fa-sign-out"></li>
      {{$t("common.logout")}}
    </div>


    <div>
      <el-dialog
        title="个人中心"
        :visible.sync="showCenter"
        width="30%"
        :modal-append-to-body="false"
        >
        <el-form>
          <el-form-item label="用户名:" :label-width="formLabelWidth">
            <el-input v-model="form.name" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="昵称:" :label-width="formLabelWidth">
            <el-input v-model="form.nickName" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="部门:" :label-width="formLabelWidth">
            <el-input v-model="form.sysDept.name" :disabled="true" ></el-input>
          </el-form-item>
          <el-form-item label="角色:" :label-width="formLabelWidth">
            <el-input v-model="form.roleList" :disabled="true" ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showCenter = false" size="small">取 消</el-button>
        <el-button type="primary" @click="showCenter = false" size="small">确 定</el-button>
       </span>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="修改密码"
        :visible.sync="changePwd"
        width="40%"
        :modal-append-to-body="false"
      >
        <el-form>
          <el-form-item label="原密码:" :label-width="formLabelWidth2">
            <el-input v-model="user2.password" ></el-input>
          </el-form-item>
          <el-form-item label="新密码:" :label-width="formLabelWidth2">
            <el-input v-model="pwdForm.newpwd"  ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:" :label-width="formLabelWidth2">
            <el-input v-model="pwdForm.dbnewpwd"  ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="changePwd = false" size="small">取 消</el-button>
        <el-button type="primary" @click="changePwd = false" size="small">确 定</el-button>
       </span>
      </el-dialog>
    </div>


  </div>
</template>

<script>
  import {removeUserCookie} from "../../utils/Auth";
  import {removeUserInfo} from "../../utils/Auth";
  import {removeToken} from "../../utils/Auth";
  import {getUserInfo} from "../../utils/Auth";

  export default {
    name: 'PersonalPanel',
    components: {},
    props: {
      user: {
        type: Object,
        default: {
          name: "admin",
          avatar: "@/assets/user.png",
          role: "超级管理员",
          registeInfo: "注册时间：2018-12-25 "
        }
      }
    },
    data() {
      return {
        showCenter: false,
        changePwd:false,
        form: {
          name:"",
          nickName:"",
          sysDept:{},
          roleList:""
        },
        pwdForm:{
          oldpwd:"",
          newpwd:"",
          dbnewpwd:""
        },
        formLabelWidth:"60px",
        formLabelWidth2:"100px",
        user2:JSON.parse(getUserInfo())
      }
    },
    methods: {
      getPersonInfo(e) {
        let params={
          name:this.user2.name
        }
        this.$api.user.getUserCenter(params).then(res=>{
            this.form.name=res.data.name
            this.form.nickName=res.data.nickName
            this.form.sysDept=res.data.sysDept
            this.form.roleList=this.getRoleName(res.data.list)
            this.showCenter = true
        })
      },
      getRoleName(list){
        let res=""
        for(var i=0;i<list.length;i++){
          res=res+list[i].remark+"、"
        }
        res=res.substring(0,res.length-1)
        return res
      },
      // 退出登录
      logout: function () {
        this.$confirm("确认退出吗?", "提示", {
          type: "warning"
        })
          .then(() => {
            this.$router.push("/login")
            this.$api.login.logout().then((res) => {
              removeToken()
              removeUserCookie()
              removeUserInfo()
              this.$store.commit('updateMainTabs', [])
              this.$router.push("/Login")
            }).catch(function (res) {
            })
          })
          .catch(() => {
          })
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .personal-panel {
    font-size: 14px;
    width: 280px;
    text-align: center;
    border-color: rgba(180, 190, 190, 0.2);
    border-width: 1px;
    border-style: solid;
    background: rgba(182, 172, 172, 0.1);
    margin: -14px;
  }

  .personal-desc {
    padding: 15px;
    color: #fff;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 90px;
  }

  .name-role {
    font-size: 16px;
    padding: 5px;
  }

  .personal-relation {
    font-size: 16px;
    padding: 12px;
    margin-right: 1px;
    background: rgba(200, 209, 204, 0.3);
  }

  .relation-item {
    padding: 12px;
  }

  .relation-item:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
  }

  .main-operation {
    padding: 8px;
    margin-right: 1px;
    /* background: rgba(175, 182, 179, 0.3); */
    border-color: rgba(201, 206, 206, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .main-operation-item {
    margin: 15px;
  }

  .other-operation {
    padding: 15px;
    margin-right: 1px;
    text-align: left;
    border-color: rgba(180, 190, 190, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .other-operation-item {
    padding: 12px;
  }

  .other-operation-item:hover {
    cursor: pointer;
    background: #9e94941e;
    color: rgb(19, 138, 156);
  }

  .personal-footer {
    margin-right: 1px;
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-color: rgba(180, 190, 190, 0.2);
    border-top-width: 1px;
    border-top-style: solid;
  }

  .personal-footer:hover {
    cursor: pointer;
    color: rgb(19, 138, 156);
    background: #b1a6a61e;
  }
</style>
