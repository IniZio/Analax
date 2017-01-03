<template>
<div id="alx-toolbar">
  <div class="navbar navbar-default" type="default">
    <div class="container-fluid">
      <div class="navbar-header ">
        <a class="navbar-brand collapse navbar-collapse" href="#"><img src="../../assets/Analax_logo_color.png" style="max-height: 30px" alt="Analax"></a>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li v-if="isLoginned"><a><span class="fa fa-user"></span></a></li>
          <li v-else><a><span class="fa fa-sign-in"></span></a></li>
          <li><a @click="removeFrame()"><div class="fa fa-stop" id="alx-removeFrame"></div></a></li>
          <li><a @click="offEditor()"><span class="fa fa-remove"></span></a></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    data () {
      return {
        isLoginned: true
      }
    },
    computed: {
      // ...mapGetters({getLoginState: 'isLoginned'})
    },
    methods: {
      ...mapActions(['setEditorMode']),
      removeFrame () {
        $('[id*=alx]').contents().unwrap()
      },
      offEditor () {
        this.setEditorMode(false)
      }
    }
  }
</script>
<style lang='scss' src="./style.scss" />
