<template>
<div class="actionBox from-below" :class="{'is-active': show}">{{title}}
<div class="uk-form-row">
  <label class="uk-form-label" for="form-gender">Gender</label>
  <select>
      <option>Male</option>
      <option>Female</option>
  </select>
</div>
</div>
</template>
<script>
  export default {
    props: {
      title: { default: 'title' },
      content: { default: 'content' },
      placement: { default: 'top' },
      show: { default: false }
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
