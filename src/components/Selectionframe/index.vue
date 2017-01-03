<template>
<div id="alx-selectionFrame" class="Selectionframe" :class="{'is-selected': isSelected}" @click="toggleSelection(true)">
<div v-html="element.outerHTML"></div>
<Actionbox :title="popTitle" :content="popContent" :placement="popPlacement" :show="isSelected" />
</div>
</template>
<script>
  export default {
    components: {
      Actionbox: require('../Actionbox')
    },
    data () {
      return {
        isSelected: false,
        popTitle: 'Title for bubble',
        popContent: 'Content for bubble',
        popPlacement: 'top'
      }
    },
    methods: {
      toggleSelection (state) {
        if (state !== null) this.isSelected = state
        else this.isSelected = !this.isSelected
      }
    },
    mounted () {
      // $(this.$el).append(this.element.outerHTML)
      // document.addEventListener('click', this.toggleSelection(false))
    }
  }
</script>
<style lang='scss' src="./style.scss" />
