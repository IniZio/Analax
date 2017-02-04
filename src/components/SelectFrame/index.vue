<template>
  <Poptip placement="bottom" :visible.sync="isSelected">
    <!-- websites's element -->
    <!-- <Tooltip content="" placement="top-end"> -->
    <div class="alx-selectframe" :class="{'is-selected': isSelected}" v-html="element.outerHTML"></div>
    </Tooltip>
    <!-- Popup for pin insert/modify -->
     <div slot="content">
      <pin-popup :element="element"></pin-popup>
    </div>
  </Poptip>
</template>
<script>
  import {
    addPins
  } from '~vuex/action'
  import {
    getPins
  } from '~vuex/getter'
  export default {
    components: {
      pinPopup: require('~components/pinPopup')
    },
    beforeDestroy() {
      // console.log('going to be destroyed')
      // $(this.$el)[0].append(this.element)
      // console.log($(this)[0])
    },
    data() {
      return {
        isSelected: false,
      }
    },
    methods: {
      toggleSelection(state) {
        this.isSelected = state || !this.isSelected
        $(this).on('click', function (e) {
          e.stopPropagation();
        })
      }
    },
    events: {
      'submitted pin': function () {
        this.toggleSelection(false)
      }
    },
    vuex: {
      actions: {
        addPins
      },
      getters: {
        getPins
      }
    }
  }

</script>
<style lang="less" src="./style.less"></style>
