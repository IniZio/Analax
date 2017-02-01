<template>
<Poptip placement="bottom" :visible.sync="isSelected">
  <!-- websites's element -->
  <!-- <Tooltip content="" placement="top-end"> -->
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
            <i-input :value.sync="form.event.eventLabel" :disabled="labelType !== 'custom'" size="small"></i-input>
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
import { addPins } from '~vuex/action'
import { getPins } from '~vuex/getter'
  export default {
    beforeDestroy () {
      // console.log('going to be destroyed')
      // $(this.$el)[0].append(this.element)
      // console.log($(this)[0])
    },
    data () {
      return {
        isSelected: false,
        labelType: 'custom',
        form: {
          hitType: 'event', // whether is event/pageview/social associations... aka. type of tracker
          event: {
            eventCategory: 'default', // of the object
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
    computed: {
      identifier: function () { return '#' + this.element.id },
      template: function () {
        var tpl = {
          hitType: ['event', 'pageview'],
          event: {
            eventCategory: [],
            eventAction: ['click']
          },
          pageview: {
            title: '',
            location: '',
            page: ''
          },
          labelType: ['custom']
        }

        if (this.element.tagName === 'INPUT') tpl.event.eventCategory.push('input')
        if (this.element.tagName === 'A') {
          tpl.event.eventCategory.push('link')
          tpl.labelType.push('link')
        }

        return tpl
      }
    },
    methods: {
      submitTracker () {
        var trackedEl = this.element // tracked element identifier
        var elIdentifier = this.identifier

        this.addPins([{
          identifier: elIdentifier,
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
    watch: {
      'labelType': function (newLabel) {
        if (this.labelType === 'link' && this.element.tagName === 'A') {
          this.form.event.eventLabel = this.element.href //or getAttribute('href')?
        }
      }
    },
    vuex: {
      actions: { addPins },
      getters: { getPins }
    }
  }
</script>
<style lang="less" src="./style.less"></style>
