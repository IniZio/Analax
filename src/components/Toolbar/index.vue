<template>
<div id="alx-toolbar">
  <div class="toolbar-space"></div>
  <Menu mode="horizontal" theme="light" active-key="1">
    <Menu-item key="1">
      <img src="~assets/logo.png" style="max-height: 30px; vertical-align: middle">
    </Menu-item>
    <div class="flip">
      <Menu-item key="3" @click="removeFrame()">
        <Icon type="stop"></Icon>
      </Menu-item>
      <Menu-item key="2">
        <Icon type="close"></Icon>
      </Menu-item>
    </div>
  </Menu>
</div>
</template>
<script>
</script>
<style lang="less" src="./style.less"></style>
