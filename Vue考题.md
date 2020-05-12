
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
说出常用 API：router-link/router-view/this.$router.push/this.$router.replace/
this.$route.params
this.$router.push('/user-admin')
this.$route.params

**router-link**
组件支持用户在具有路由功能的应用中 (点击) 导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

<router-link> 比起写死的 <a href="..."> 会好一些，理由如下：

- 无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。
- 在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。
- 当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写 (基路径) 了。

**router-view**
<router-view> 组件是一个 functional 组件，渲染路径匹配到的视图组件。<router-view> 渲染的组件还可以内嵌自己的 <router-view>，根据嵌套路径，渲染嵌套组件。

- router-view 有一个 name 属性，默认值是 default。如果 <router-view>设置了名称，则会渲染对应的路由配置中 components 下的相应组件。

**Router 构建选项**
```
export default new Router({
  mode: 'history',
  routes: [{},{}]
})
```

- mode
hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器.
history: 依赖 HTML5 History API 和服务器配置。

- base
类型: string

默认值: "/"

应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。

- 其他
this.$router

router 实例。

this.$route

当前激活的路由信息对象。这个属性是只读的，里面的属性是 immutable (不可变) 的，不过你可以 watch (监测变化) 它。

#增加的组件配置

