<template>
  <Collapse id="alx-trackerOverview" active-key="1" accordion>
    <Panel key="1">
      Tracker Overview
      <div slot="content">
        <p v-for="pin in getPins">{{pin.identifier}}</p>
      </div>
    </Panel>
  </Collapse>
</template>
<script>
import { getPins } from '~vuex/getter'

export default {
  vuex: {
    getters: { getPins }
  }
}

</script>
<style lang="less" src="./style.less"></style>
