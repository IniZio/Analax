<template>
<Modal v-if="submitModal" :visible.sync="submitModal" width="360">
  <p slot="header" style="text-align:center">
      <Icon type="information-circled"></Icon>
      <span>Save Trackers</span>
  </p>
  <div>
    <i-input type="textarea" :autosize="{minRows: 2}" :value="getTrackersString" placeholder="No trackers" readonly></i-input>
  </div>
  <div slot="footer">
      <i-button type="error" size="large" long :loading="modal_loading" @click="">Submit</i-button>
  </div>
</Modal>
<div id="alx-toolbar">
  <div class="toolbar-space"></div>
  <Menu mode="horizontal" theme="light" active-key="1">
    <Menu-item key="1">
      <img src="~assets/logo.png" style="max-height: 30px; vertical-align: middle">
    </Menu-item>
    <div class="flip">
      <Menu-item key="2" @click="pauseEditor()">
        <Icon type="pause"></Icon>
      </Menu-item>
      <Menu-item key="3" @click="disableStartup()">
        <Icon type="close"></Icon>
      </Menu-item>
      <Menu-item key="4" @click="submitTrackers()">
        <Icon type="checkmark"></Icon>
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
    pauseEditor () {
      // 1. remove/hide selectionframes?
      this.$dispatch('pause-editor')
      // 2. overviews of trackers & elements occupy whole screen?
    },
    disableStartup () {
      this.pauseEditor()
      // TODO send request to control panel to set hide live editor on visit website
      // TODO show a popdown at top instead that triggers showing the live editor
    },
    submitTrackers () {
      this.submitModal = true
    }
  },
  vuex: {
    getters: {
      getTrackersString: state => {
        var trackerJSON = JSON.stringify(state.trackers.map(function (el) {
          return el.tracker[el.tracker.hitType]
        }))
        // Make it suitable for ga function parameter
        trackerJSON.replace(/\\"/g,"\uFFFF")
        trackerJSON = trackerJSON.replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\"")

        return trackerJSON
      }
    }
  }
}
</script>
<style lang="less" src="./style.less"></style>
