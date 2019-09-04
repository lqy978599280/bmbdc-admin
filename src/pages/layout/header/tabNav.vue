<template>
  <div>
    <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                editableTabsValue2: '6',
                editableTabs2: [{
                    title: '首页',
                    name: '1',
                    content: ''
                }],
                tabIndex: 6
            }
        },
        methods: {
            removeTab(targetName) {
                let tabs = this.editableTabs2;
                let activeName = this.editableTabsValue2;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue2 = activeName;
                this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
            }
        }
    }
</script>
<style scoped lang="stylus">

</style>
