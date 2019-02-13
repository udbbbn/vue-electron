import Vue from 'vue'
import myComponent from '@/components/myComponent'

describe('myComponent.vue', () => {
    it ('计数器在点击按钮时自增', () => {
        // 获取mount中的组件实例
        const vmComponent = new Vue(myComponent).$mount();
        // 点击前
        console.log('计算器点击之前的值：' + vmComponent.count);
        // 调用实例中的increment方法 点击计算器
        vmComponent.increment();
        // 点击之后
        console.log('计算器点击之后的值：' + vmComponent.count);
        // 判断最后的count是否为最后对应的值
        expect(vmComponent.count).to.equal(1)
    })
})