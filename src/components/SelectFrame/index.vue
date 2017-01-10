<template>
<div id="alx-selectframe"
      :class="{'is-selected': isSelected}"
      @click="toggleSelection(true)">
  <Poptip :visible.sync="isSelected" placement="top">
    <!-- websites's element -->
    <div v-html="element.outerHTML"></div>
    <!-- Popup for action -->
    <div class="alx-actionpopup" slot="content">
      <i-form>
        <Form-item label="Event">
            <i-input></i-input>
        </Form-item>
        <Form-item>
            <i-button type="primary">提交</i-button>
            <i-button type="ghost" style="margin-left: 8px">取消</i-button>
        </Form-item>
      </i-form>
    </div>
  </Poptip>
</div>
</template>
<script>
  export default {
    data () {
      return {
        isSelected: false
      }
    },
    methods: {
      toggleSelection (state) {
        this.isSelected = state || !this.isSelected
      }
    }
  }
</script>
<style lang="less" src="./style.less"></style>
