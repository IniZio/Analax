<template>
  <Collapse id="alx-trackerOverview" active-key="1" accordion>
    <Panel key="1">
      Tracker Overview
      <div slot="content">
        <p v-for="pin in getPins">{{pin.pattern}}</p>
      </div>
    </Panel>
    <Panel key="2">
      Page View Tracker
      <div slot="content">
        <pin-popup></pin-popup>
      </div>
    </Panel>
  </Collapse>
</template>
<script>
import { getPins } from '~vuex/getter'

export default {
  components: {
      pinForm: require('~components/PinForm')
  },
  vuex: {
    getters: { getPins }
  }
}

</script>
<style lang="less" src="./style.less"></style>
