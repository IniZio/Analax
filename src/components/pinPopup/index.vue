<template>
  <div class="alx-pinpopup">
    <i-form label-position="top">
      <Form-item label="Hit type">
        <i-select :model.sync="form.hitType" size="small">
          <i-option v-for="item in template.hitType" :value="item">{{ item }}</i-option>
        </i-select>
      </Form-item>
      <div v-show="form.hitType === 'event'">
        <Form-item label="Event Category">
          <i-select :model.sync="form.event.eventCategory" size="small">
            <i-option v-for="item in template.event.eventCategory" :value="item">{{ item }}</i-option>
          </i-select>
        </Form-item>
        <Form-item label="Event Action">
          <i-select :model.sync="form.event.pin" size="small">
            <i-option v-for="item in template.event.pin" :value="item">{{ item }}</i-option>
          </i-select>
        </Form-item>
        <Form-item label="Event Label">
          <i-select :model.sync="labelType" size="small">
            <i-option v-for="item in template.labelType" :value="item">{{ item }}</i-option>
          </i-select>
        </Form-item>
        <Form-item>
          <i-input :value.sync="form.event.eventLabel" :disabled="labelType !== 'custom'" size="small"></i-input>
        </Form-item>
      </div>
      <div v-show="form.hitType === 'pageview'">
        <Form-item label="Page Title">
          <i-input :value.sync="form.pageview.title" size="small"></i-input>
        </Form-item>
        <Form-item label="Page location">
          <i-input :value.sync="form.pageview.location" size="small" disabled></i-input>
        </Form-item>
      </div>
      <Form-item style="text-align: center">
        <i-button type="primary" @click.prevent="submitPin()">Save</i-button>
        <i-button type="ghost" style="margin-left: 8px" @click.prevent="$dispatch('submitted pin')">Cancel</i-button>
      </Form-item>
    </i-form>
  </div>
</template>
<script>
  import {
    addPins
  } from '~vuex/action'
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
      submitPin() {
        var trackedEl = this.element // tracked element pattern
        var elPattern = this.pattern

        this.addPins([{
          pattern: elPattern,
          tracker: this.form
        }])

        this.$Message.success('Tracker added');
        this.$dispatch('submitted pin')
      },
    },
    watch: {
      'labelType': function (newLabel) {
        if (this.labelType === 'link' && this.element.tagName === 'A') {
          this.form.event.eventLabel = this.element.href //or getAttribute('href')?
        }
      }
    },
    vuex: {
      actions: {
        addPins
      },
    }
  }

</script>
<style lang="less" src="./style.less"></style>
