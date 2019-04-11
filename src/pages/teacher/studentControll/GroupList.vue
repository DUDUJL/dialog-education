<template>
  <div style="margin-top: 0px">
    <el-tabs v-model="defaultTab" type="card">
      <el-tab-pane label="小组管理" name="groupMana">
        <group-mana></group-mana>
      </el-tab-pane>
      <el-tab-pane label="成员管理" name="groupMem">
        <group-mem></group-mem>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import GroupMana from './basic/GroupMana'
  import GroupMem from './basic/GroupMem'
  export default {
    data() {
      return {
        defaultTab: 'groupMana'
      };
    },
    methods: {},
    components: {
      'group-mana': GroupMana,
      'group-mem': GroupMem
    }
  };
</script>