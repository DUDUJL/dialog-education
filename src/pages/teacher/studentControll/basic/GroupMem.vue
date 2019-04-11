<template>
<div>
  <el-tag size="medium">请选择小组:</el-tag>
  <el-select v-model="squalNums" placeholder="请选择">
    <el-option
      v-for="item in squals"
      :key="item.squalNum"
      :label="item.squalNum"
      :value="item.squalNum">
    </el-option>
  </el-select>
  <div style="margin:20px 0px 0px 0px">
  <el-transfer
    v-model="squalMem"
    :titles="['小组成员', '未分组成员']"
    :button-texts="['添加', '移出']"
    :props="{
      key: 'value',
      label: 'desc'
    }"
    :data="squalData">
  </el-transfer>
</div>
</div>
</template>


<script>
import axios from 'axios';
import { getAllSqual } from '../../../../api/api'
export default {
  data(){
  	return {
      squalNums: null,
  		squalMem: '',
  		squals: []
  	}
  },
  methods: {
	  loadSqualNums(){
      var _this = this;
      getAllSqual().then(resp =>{
        if (resp && resp.status == 200) {
          _this.squals = resp.data.data;
        }
      });
    },
    loadMemBySqual(){
      var _this = this;
      axios.get('http://localhost:8088/squal/getMemBySqual/' + this.squalNums)
      .then(function(response){
        if (response && response.status == 200){
          _this.squalData = response.data.data;      
        }
      });
    }
      
  },

  mounted:function () {
      this.loadSqualNums();
      this.loadMemBySqual();
  }
}
</script>


<style>
	
</style>