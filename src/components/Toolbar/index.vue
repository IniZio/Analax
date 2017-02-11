<template>
<!-- <div v-if="submitModal" :visible="submitModal" width="650">
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
</div> -->
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
import {mapActions} from 'vuex'
import {Pinbox2Str} from '../../util'
export default {
  created () {

  },
  data () {
    return {
      submitModal : false
    }
  },
  methods: {
    ...mapActions([
      'setEditorMode'
    ]),
    // pauseEditor () {
    //   // 1. remove/hide selectionframes?
    //   this.setEditorMode('PAUSED')
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
        return Pinbox2Str(state.pins)
      }
    }
  }
}
</script>
<style lang="less" src="./style.less"></style>
