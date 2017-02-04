<template>
<Modal v-if="submitModal" :visible.sync="submitModal" width="650">
  <p slot="header" style="text-align:center">
      <Icon type="information-circled"></Icon>
      <span>Save Trackers</span>
  </p>
  <div>
    <i-input type="textarea" :autosize="{minRows: 2}" :value="getPinsStr" placeholder="No trackers" readonly></i-input>
  </div>
  <div slot="footer">
      <i-button type="error" size="large" long :loading="modal_loading" @click="">Submit</i-button>
  </div>
</Modal>
<div id="alx-toolbar">
  <div class="toolbar-space"></div>
  <Menu mode="horizontal" theme="light" active-key="1">
    <Menu-item key="1">
      <a href="/somewhereelse">
        <Icon type="chevron-left"></Icon><span style="margin-left: 10px">Overview</span>
        <!-- <img src="~assets/logo.png" style="max-height: 20px; vertical-align: text-bottom"> -->
      </a>
    </Menu-item>
    <div class="flip">
      <!-- <Menu-item key="2" @click="pauseEditor()">
        <Icon type="pause"></Icon>
      </Menu-item>
      <Menu-item key="3" @click="disableStartup()">
        <Icon type="close"></Icon>
      </Menu-item> -->
      <Menu-item key="4" @click="submitPins()">
        <Icon type="checkmark"></Icon> Save
      </Menu-item>
    </div>
  </Menu>
</div>
</template>
<script>
export default {
  created () {

  },
  data () {
    return {
      submitModal : false
    }
  },
  methods: {
    // pauseEditor () {
    //   // 1. remove/hide selectionframes?
    //   this.$dispatch('pause-editor')
    //   // 2. overviews of trackers & elements occupy whole screen?
    // },
    // disableStartup () {
    //   this.pauseEditor()
    //   // 1. send request to control panel to set hide live editor on visit website
    //   // 2. show a popdown at top instead that triggers showing the live editor
    // },
    submitPins () {
      this.submitModal = true
    }
  },
  vuex: {
    getters: {
      getPinsStr: state => {
        return JSON.stringify(state.pins.map(function (pin) {
          var pinTrackerDetail = JSON.stringify(pin.tracker[pin.tracker.hitType])
          pinTrackerDetail.replace(/\\"/g,"\uFFFF")
          pinTrackerDetail = pinTrackerDetail.replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\'").replace(/\"/g, '\'')

          if (pin.tracker.hitType === 'pageview')
          return 'ga(\'send\','+
          '\'' + pin.tracker.hitType + '\',' +
          pinTrackerDetail +
          ')'

          return 'document.getElementById(\''+ pin.pattern.replace(/#/g, '') + '\').addEventListener(\'' + pin.tracker.event.eventAction + '\',function() {ga(\'send\','+
            '\'' + pin.tracker.hitType + '\',' +
            pinTrackerDetail +
          ')})'
        }))
      }
    }
  }
}
</script>
<style lang="less" src="./style.less"></style>
