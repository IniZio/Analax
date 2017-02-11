<template>
  <div id="pin" @click="toggleSelection(null)">
    <!-- websites's element -->
    <div class="alx-pinframe" :class="{'is-selected': isSelected}" v-html="element.outerHTML"></div>
    </Tooltip>
    <!-- Popup for pin form -->
    <div class="pin-popup" :style="{'display': (isSelected ? '' : 'none')}">
      <pin-form :element="element"></pin-form>
    </div>
  </div>
</template>
<script>
  import '../../util/jquery.copycss'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      pinForm: require('~components/PinForm')
    },
    beforeDestroy() {
      // $(this.$el)[0].append(this.element)
    },
    created () {
      this.$bus.$on('DONE PIN', function () {
        this.toggleSelection(false)
      }.bind(this))
    },
    data() {
      return {
        isSelected: false,
      }
    },
    methods: {
      ...mapActions([
        'addPins'
      ]),
      toggleSelection(state) {
        this.isSelected = state || !this.isSelected
        $(this).on('click', function (e) {
          e.stopPropagation();
        })
      }
    },
    computed: {
      ...mapGetters([
        'getPins'
      ])
    }
  }

</script>
<style lang="less" src="./style.less"></style>
