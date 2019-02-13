<template>
  <div class="page">
     <div class="left-bar">
       <article class="base">
         <header class="header">
           <Icon type="ios-desktop-outline" class="icon"/>
           <span class="title">系统</span>
         </header>
         <section class="info">
           <p>操作系统: <span>{{os}}</span></p>
           <p>操作系统内核: <span>{{kernel}}</span></p>
           <p>平台: <span>{{platform}}</span></p>
           <p>用户名: <span>{{hostname}}</span></p>
         </section>
       </article>
       <article class="cpus">
         <header class="header">
           <Icon type="ios-planet-outline" class="icon" />
           <span class="title">CPU</span>
         </header>
         <section class="info">
           <p>CPU型号: <span>{{cpuName}}</span></p>
           <p>核心数: <span>{{numberOfCores}}</span></p>
           <p>频率: <span>{{currentClockSpeed}} MHZ</span></p>
           <p>L2缓存: <span>{{l2CacheSize || 0}}</span></p>
           <p>L3缓存: <span>{{l3CacheSize || 0}}</span></p>
         </section>
       </article>
       <article class="ram">
         <header class="header">
           <Icon type="ios-leaf-outline" class="icon"/>
           <span class="title">内存RAM</span>
         </header>
         <section class="info">
           <p>已用内存: <span>{{usedmem | toMem}}</span></p>
           <p>空闲内存: <span>{{freemem | toMem}}</span></p>
           <p>总内存: <span>{{totalmem | toMem}}</span></p>
         </section>
        </article>
       <article class="used">
         <header class="header">
          <Icon type="ios-pie-outline" class="icon" />
          <span class="title">使用情况</span>
         </header>
          <section class="info">
            <p>内存使用：</p>
            <Progress :percent="percentMem" status="active" />
          </section>
          <section class="info">
            <p>CPU使用：</p>
            <Progress :percent="LoadPercentage" status="active" />
          </section>
       </article>
     </div>
  </div>
</template>

<script type="text/ecmascript-6">
import os from 'os';
import { toMem } from '@/extend/filter';
import { constants } from 'http2';
var wmic = require('node-wmic');
export default {
  data() {
    return {
        os : '',
        cpuName: '',
        numberOfCores: '',
        currentClockSpeed: '',
        l2CacheSize: '',
        l3CacheSize: '',
        LoadPercentage: 0,
        percentMem: parseInt((os.totalmem() - os.freemem()) / os.totalmem() * 100)
    }
  },
  components: {

  },
  created() {
      this.getOSInfo();
  },
  filters: {
    toMem: toMem
  },
  computed: {
      kernel() {
        return os.type();
      },
      platform() {
        return os.platform();
      },
      hostname() {
        return os.hostname();
      },
      usedmem() {
        return os.totalmem - os.freemem();
      },
      freemem() {
        return os.freemem();
      },
      totalmem() {
        return os.totalmem();
      }
  },
  methods: {
    getOSInfo() {
        let vm = this;
        wmic.OS().then(data => {
            vm.os = data[0].Caption;
        });
        wmic.CPU().then(data => {
          vm.cpuName = data[0].Name;
          vm.numberOfCores = data[0].NumberOfCores;
          vm.currentClockSpeed = data[0].CurrentClockSpeed;
          vm.l2CacheSize = data[0].L2CacheSize;
          vm.l3CacheSize = data[0].L3CacheSize;
          vm.LoadPercentage = parseInt(data[0].LoadPercentage)
        });
    }
  }
}
</script>

<style scoped lang="scss">
    .page {
        height: 100%;
    }
    .left-bar {
      width: 100%;
      height: 100%;
      border-right: 1px solid #dddee1;
      .base {
        padding-top: 10px;
      }
      .header {
        display: flex;
        width: 100%;
        padding: 0 20px 0 5px;
        .icon {
          font-size: 32px;
          color: rgb(51, 174, 252);
        }
        .title {
          line-height: 32px;
          padding-left: 10px;
          font-size: 20px;
          font-weight: 700;
        }
      }
      .info {
        padding: 10px 0 10px 20px;
        p {
          line-height: 24px;
          font-size: 14px;
        }
      }
      .cpubar {
        padding-top: 10px;
      }
    }
</style>
