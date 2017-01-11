<template>
<Poptip :visible.sync="isSelected" placement="bottom">
  <!-- websites's element -->
  <div id="alx-selectframe"
    :class="{'is-selected': isSelected}"
    v-html="element.outerHTML"></div>
  <!-- Popup for eventAction -->
  <div class="alx-eventActionpopup" slot="content">
    <i-form label-position="top">
      <Form-item label="Hit type">
          <i-select :model.sync="form.hitType" size="small">
            <i-option v-for="item in ['event', 'pageview']" :value="item">{{ item }}</i-option>
          </i-select>
      </Form-item>
      <Form-item label="Event Category">
          <i-select :model.sync="form.event.eventCategory" size="small">
            <i-option v-for="item in ['input', 'link']" :value="item">{{ item }}</i-option>
          </i-select>
      </Form-item>
      <Form-item label="Event Action">
          <i-select :model.sync="form.event.eventAction" size="small">
            <i-option v-for="item in ['click']" :value="item">{{ item }}</i-option>
          </i-select>
      </Form-item>
      <Form-item label="Event Label">
          <i-select :model.sync="labelType" size="small">
            <i-option v-for="item in ['link', 'custom']" :value="item">{{ item }}</i-option>
          </i-select>
      </Form-item>
      <Form-item>
          <i-input :model.sync="form.event.eventLabel" :disabled="labelType !== 'custom'" size="small"></i-input>
      </Form-item>
      <Form-item style="text-align: center">
          <i-button type="primary" @click.prevent="submitTracker(); toggleSelection(false)">Save</i-button>
          <i-button type="ghost" style="margin-left: 8px"
              @click.prevent="toggleSelection(false)">Cancel</i-button>
      </Form-item>
    </i-form>
  </div>
</Poptip>
</template>
<script>
  export default {
    data () {
      return {
        isSelected: false,
        labelType: '',
        form: {
          hitType: 'event', // whether is event/pageview/social associations... aka. type of tracker
          event: {
            eventCategory: 'input', // of the object
            eventAction: 'click', // the intereventAction, set nonIntereventAction field in GA tracker if non-intereventAction event
            eventLabel: '', // for categorising the event
            value: '',  // the number that is associated with the event
            transport: '' // need to set as beacon if is form
          }
        },

      }
    },
    methods: {
      submitTracker () {
        var hitDetails = JSON.stringify(this.form.event, null, 2)
        hitDetails.replace(/\\"/g,"\uFFFF")
        hitDetails = hitDetails.replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\"")
        console.log(hitDetails)
        this.$Notice.success({
            title: 'Tracker saved',
            desc: 'ga(\'send\',' + this.form.hitType + ',\n'
                   + hitDetails,
            duration: 0
        });
      },
      toggleSelection (state) {
        this.isSelected = state || !this.isSelected
        console.log(this.element.attributes.id.value)
      }
    }
  }
</script>
<style lang="less" src="./style.less"></style>
