<template>
<div class="v-popover-wrap" :style="{left: x + 'px', top: y + 'px', visibility: show ? 'visible' : 'hidden'}">
  <div class="v-popover-box">
    <div class="v-popover-title">{{title}}</div>
    <div class="v-popover-content">{{content}}</div>
    <div :class="['v-popover-arrow', placement == 'top' ? 'v-popover-arrow-top' : 'v-popover-arrow-bottom']" :style="{left: arrowLeft + 'px'}"></div>
  </div>
</div>
</template>
<script>
  export default {
    props: {
      title: {
        default: 'title'
      },
      content: {
        default: 'content'
      },
      placement: {
        default: 'top'
      }
    },
    data () {
      return {
        show: false,
        arrowLeft: 0,
        x: 0,
        y: 0
      }
    },
    methods: {
      pop (el) {
        if (this.show) {
          this.show = false
          return
        }
        var target = el
        this.arrowLeft = target.offsetWidth / 2
        this.x = target.offsetLeft
        if (this.placement === 'top') {
          this.y = target.offsetTop - this.$children['pop'].offsetHeight - 3
        } else {
          this.y = target.offsetTop + target.offsetHeight + 3
        }
        this.show = true
      }
    },
    mounted () {
      this.pop(this.$el)
    }
  }
</script>
<style lang='scss' src="./style.scss" />
