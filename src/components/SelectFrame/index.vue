<template>
<Poptip placement="bottom" :visible.sync="isSelected">
  <!-- websites's element -->
  <Tooltip content="" placement="top-end">
  <div class="alx-selectframe"
    :class="{'is-selected': isSelected}"
    v-html="element.outerHTML"></div>
  </Tooltip>
  <!-- Popup for eventAction -->
  <div class="alx-eventActionpopup" slot="content">
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
            <i-select :model.sync="form.event.eventAction" size="small">
              <i-option v-for="item in template.event.eventAction" :value="item">{{ item }}</i-option>
            </i-select>
        </Form-item>
        <Form-item label="Event Label">
            <i-select :model.sync="labelType" size="small">
              <i-option v-for="item in template.labelType" :value="item">{{ item }}</i-option>
            </i-select>
        </Form-item>
        <Form-item>
            <i-input :model.sync="form.event.eventLabel" :disabled="labelType !== 'custom'" size="small"></i-input>
        </Form-item>
      </div>
      <div v-show="form.hitType === 'pageview'">
          <Form-item label="Page Title">
              <i-input :model.sync="form.pageview.title" size="small"></i-input>
          </Form-item>
      </div>
      <Form-item style="text-align: center">
        <i-button type="primary" @click.prevent="submitTracker()">Save</i-button>
        <i-button type="ghost" style="margin-left: 8px"
            @click.prevent="toggleSelection(false)">Cancel</i-button>
      </Form-item>
    </i-form>
  </div>
</Poptip>
</template>
<script>
import { addTrackers } from '~vuex/action'
  export default {
    beforeDestroy () {
      // console.log('going to be destroyed')
      // $(this.$el)[0].append(this.element)
      // console.log($(this)[0])
    },
    data () {
      return {
        submittedTrackers: [],
        isSelected: false,
        template: {
          hitType: ['event', 'pageview'],
          event: {
            eventCategory: ['input', 'link'],
            eventAction: ['click']
          },
          pageview: {
            title: '', // page title
            location: '', // either location or page must be in the tracker
            page: '' // protion of url after domwn name
          },
          labelType: ['link', 'custom']
        },
        labelType: 'link',
        form: {
          hitType: 'event', // whether is event/pageview/social associations... aka. type of tracker
          event: {
            eventCategory: 'input', // of the object
            eventAction: 'click', // the intereventAction, set nonIntereventAction field in GA tracker if non-intereventAction event
            eventLabel: '', // for categorising the event
            value: '',  // the number that is associated with the event
            transport: '' // need to set as beacon if is form
          },
					pageview: {
					}
        }
      }
    },
    methods: {
      submitTracker () {
        // var hitDetails = JSON.stringify(this.form.event)

        // // Make it suitable for ga function parameter
        // hitDetails.replace(/\\"/g,"\uFFFF")
        // hitDetails = hitDetails.replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\"")

        var trackedEle = this.element // tracked element identifier
        // var gaTrackerStr = 'ga (\'send\',\'' + this.form.hitType + '\',\n'
        //            + hitDetails + ')'

        this.addTrackers([{
          el: trackedEle,
          tracker: this.form
        }])

        this.toggleSelection(false);
        this.$Message.success('Tracker added');
      },
      toggleSelection (state) {
        this.isSelected = state || !this.isSelected
        $(this).on('click', function (e) {
            e.stopPropagation();
        })
      }
    },
    vuex: {
      actions: { addTrackers }
    }
  }
</script>
<style lang="less" src="./style.less"></style>
