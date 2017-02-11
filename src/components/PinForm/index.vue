<template>
  <div class="alx-pinpopup">
    <form label-position="top">
      <div label="Hit type">
        <select :model.sync="form.hitType" size="small">
          <option v-for="item in template.hitType" :value="item">{{ item }}</option>
        </select>
      </div>
      <div v-show="form.hitType === 'event'">
        <div label="Event Category">
          <select :model.sync="form.event.eventCategory" size="small">
            <option v-for="item in template.event.eventCategory" :value="item">{{ item }}</option>
          </select>
        </div>
        <div label="Event Action">
          <select :model.sync="form.event.pin" size="small">
            <option v-for="item in template.event.pin" :value="item">{{ item }}</option>
          </select>
        </div>
        <div label="Event Label">
          <select :model.sync="labelType" size="small">
            <option v-for="item in template.labelType" :value="item">{{ item }}</option>
          </select>
        </div>
        <div>
          <input :value.sync="form.event.eventLabel" :disabled="labelType !== 'custom'" size="small"></input>
        </div>
      </div>
      <div v-show="form.hitType === 'pageview'">
        <div label="Page Title">
          <input :value.sync="form.pageview.title" size="small"></input>
        </div>
        <div label="Page location">
          <input :value.sync="form.pageview.location" size="small" disabled></input>
        </div>
      </div>
      <div style="text-align: center">
        <button type="primary" @click.prevent="submitPin()">Save</button>
        <button type="ghost" style="margin-left: 8px" @click.prevent="$bus.$emit('submitted pin')">Cancel</button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['element'],
  data () {
    return {
      labelType: 'custom',
      form: {
        hitType: '', // whether is event/pageview/social associations... aka. type of tracker
        event: {
          eventCategory: 'default', // of the object
          pin: 'click', // the interpin, set nonInterpin field in GA tracker if non-interpin event
          eventLabel: '', // for categorising the event
          value: '', // the number that is associated with the event
          transport: '' // need to set as beacon if is form
        },
        pageview: {
          title: '',
          location: document.URL
        }
      }
    }
  },
  computed: {
    pattern: function () {
      return (this.element ? '#' + this.element.id : null)
    },
    template: function () {
      var tpl = {
        hitType: [],
        event: {
          eventCategory: [],
          pin: ['click']
        },
        pageview: {
          title: '',
          page: ''
        },
        labelType: ['custom']
      }

      if (this.element) { // If is an element
        tpl.hitType.push('event'); this.form.hitType = 'event'
        if (this.element.tagName === 'INPUT')
          tpl.event.eventCategory.push('input')
        if (this.element.tagName === 'A') {
          tpl.event.eventCategory.push('link')
          tpl.labelType.push('link')
        }
      } else { // else is pageview
        tpl.hitType.push('pageview'); ; this.form.hitType = 'pageview'
      }
      return tpl
    }
  },
  methods: {
    ...mapActions([
      'addPins'
    ]),
    submitPin() {
      var trackedEl = this.element // tracked element pattern
      var elPattern = this.pattern

      this.addPins([{
        pattern: elPattern,
        tracker: this.form
      }])

      this.$Message.success('Tracker added');
      this.$bus.$emit('submitted pin')
    },
  },
  watch: {
    'labelType': function (newLabel) {
      if (this.labelType === 'link' && this.element.tagName === 'A') {
        this.form.event.eventLabel = this.element.href //or getAttribute('href')?
      }
    }
  }
}
</script>
<style lang="less" src="./style.less"></style>
