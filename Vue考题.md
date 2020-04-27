
## 必考：watch computed methods 的区别

答：

watch 是侦听，computed 是计算属性，methods 是方法computed 与 methods 相比，computed 是基于响应式依赖进行缓存的。相关响应式以来改变的时候，computed 才会重新计算，否则都是返回之前缓存的结果。而 methods 看到一次就执行一次。

computed 与 watch 比较，compoted 是计算出一个属性，watch 是做别的事情比如上报一个数据，watch 在数据变化时执行异步或者开销较大时比较适用。

## Vue 的响应式是怎么做到的？

一个对象被传入 vue 实例作为 data 数据的时候，Vue 将会遍历对象的所有属性，用 Object.defineProperty 把这些属性转为 getter、setter。getter、setter 在内部能让 vue 追踪依赖。如果属性被访问或修改了，它们就会通知。

每个组件实例都对应一个 watcher 实例，这个 watcher 实例会把接触过的数据记录为依赖，当 setter 调用的时候，就通知重新渲染。

vue 不能检测对象和数组的变化，（比如对象属性的添加和删除、数组的直接改变length、以及通过数组的index改变数据某个项）

但是我们可以用 Vue.set(object, 'b', 2) / Vue.$set(this.someObject, 'b', 2)方法向嵌套对象添加响应式属性.

对于数组的变更的应对办法也是一样的：Vue.set(vm.items, itemIndex, newValue) / 
Vue.$set(vm.items, itemIndex, newValue)。对于数组 length 的改变，可以用：
Vue.items.splice(newLength)


## Vuex 你怎么用的？
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。
说出核心概念的名字和作用，State/Mutation/Action/Module。

- State: 单一状态树，用一个对象就包含了全部应用层级的状态，是唯一的数据源。每个应用只包含一个 store 实例。

- Getter: 可以大致认为是 store 的计算属性，跟计算属性相似的是，getter 的返回值会根据他的依赖被缓存起来。只要依赖发生了改变才会被重新计算。我们获取 store 的数据很多时候是通过 getters 获取的；getters 的第一个参数是 state，也可以接受其他 getter 作为第二个参数。
```
computed: {
  xxx(){
    return this.$store.getters.yyy
  }
}
```
注意：getters 通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的；而 getters 通过方法访问时，每次都会调用，而不会缓存结果。

- Mutation: 是更改 store 中的 state 状态的唯一方法。每个 mutation 都有字符串的事件类型和一个回调函数，这个回调函数就是我们更改状态的地方，并且接收 state 作为第一个参数。Mutation 也需要遵守 Vue 的响应规则，一个是要初始化好所需属性，第二个是使用 Vue.set(obj, 'newProp', 123) 来添加新属性，这样添加的属性就是响应式的（或者用新对象替换老对象：state.obj = {...state.obj, newProp: 123}）。

- Action 类似于 Mutation，不同的地方是，第一，Action 可以包含异步操作，如果有异步操作，都是放在 Action 这里；第二，Action 通过提交 Mutation 来更改 state ，而不是直接变更状态。

- Module: 因为使用单一状态树，应用的所有状态会集中在一个比较大的对象上。如果应用很复杂，那么 store 对象可能会变得很臃肿。为了解决这个问题，Vuex 能让我们把 store 分成模块，每个模块拥有自己的 state mutation action getter。


## VueRouter 你怎么用？
背下文档第一句：Vue Router 是 Vue.js 官方的路由管理器。
说出核心概念的名字和作用：History 模式/导航守卫/路由懒加载
说出常用 API：router-link/router-view/this.$router.push/this.$router.replace/this.$route.params
this.$router.push('/user-admin')
this.$route.params