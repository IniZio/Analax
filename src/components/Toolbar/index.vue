<template>
<div id="alx-toolbar">
  <nav class="uk-navbar uk-navbar-attached">
    <a class="uk-navbar-brand" href="#"><img src="~assets/Analax_logo_color.png" style="max-height: 20px" alt="Analax"></a>
    <div class="uk-navbar-flip">
      <ul class="uk-navbar-nav">
        <li v-if="isLoginned" class="uk-parent" data-uk-dropdown="" aria-haspopup="true" aria-expanded="false">
          <a href=""><i class="uk-icon-user"></i></a>

          <div class="uk-dropdown uk-dropdown-navbar uk-dropdown-bottom" aria-hidden="true" tabindex="" style="top: 40px; left: 0px;">
              <ul class="uk-nav uk-nav-navbar">
                  <li><a href="#">Item</a></li>
                  <li><a href="#">Another item</a></li>
                  <li class="uk-nav-header">Header</li>
                  <li><a href="#">Item</a></li>
                  <li><a href="#">Another item</a></li>
                  <li class="uk-nav-divider"></li>
                  <li><a href="#">Separated item</a></li>
              </ul>
          </div>

        </li>
        <li v-else><a><span class="uk-icon-sign-in"></span></a></li>
        <li>
          <a @click="removeFrame()"><i class="uk-icon-remove" id="alx-removeFrame" ></i></a>
        </li>
        <li><a @click="toggleEditorMode(false)">
          <i class="uk-icon-stop"></i>
        </a></li>
      </ul>
    </div>
  </div>
</div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'

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
      ...mapActions(['toggleEditorMode']),
      ...mapGetters(['getEditorMode']),
      removeFrame () {
        $('[id*=alx]').contents().unwrap()
      }
    }
  }
</script>
<style lang='scss' src="./style.scss" />
