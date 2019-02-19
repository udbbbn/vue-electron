<template>
  <div class="page" v-show="show">
    <section class="card-hdd">
      <div class="head-hdd">
        <img :src="imgHdd" alt="" class="img-hdd">
        <p>{{data.VolumeName}}</p>
        <p>({{data.Caption}})</p>
      </div>
      <div class="detail-hdd">
        <label for="">剩余容量：</label>
        <p>{{data.FreeSpace | toMem}}</p>
        <label for="">总容量：</label>
        <p>{{data.Size | toMem}}</p>
        <label for="">使用率：</label>
        <Progress :percent="parseInt((data.Size - data.FreeSpace) / data.Size * 100)" status="active"></Progress>
        <label for="" v-if="data.FileSystem">文件系统：</label>
        <p>{{data.FileSystem}}</p>
        <label for="" v-if="data.Description">描述：</label>
        <p>{{data.Description}}</p>
        <label for="" v-if="data.VolumeSerialNumber">序列号：</label>
        <p>{{data.VolumeSerialNumber}}</p>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      imgHdd: require('../assets/disk-ssd.png')
    }
  },
  components: {

  }
}
</script>

<style scoped lang="scss">
.page {
    width: 100%;
    height: 100%;
    border-right: 1px solid #dddee1;
    .card-hdd {
      height: 100%;
    }
    .head-hdd {
      text-align: center;
      p {
        line-height: 28px;
        height: 28px;
      }
    }
    .img-hdd {
      max-width: 100%;
      max-height: 100%;
      width: 150px;
      height: 150px;
    }
    .detail-hdd {
      padding: 20px 0 0 20px;
      label {  
        padding: 5px 0;
          line-height: 24px;
          height: 24px;
          display: block;
          font-size: 14px;
          color: #bbb;
      }
      p {
        height: 24px;
        line-height: 24px;
      }
    }
}
</style>
