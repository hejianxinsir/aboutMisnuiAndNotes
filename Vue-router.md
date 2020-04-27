Vue 路由 vue-router

## 通过注入路由器，我们可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由:
```
// 注意下面的 this.$router.push('/') 和 this.$router.go(-1) 和 window.history.length

// Home.vue
export default {
computed: {
username() {
// 我们很快就会看到 `params` 是什么
return this.$route.params.username
}
},
methods: {
goBack() {
window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
}
}
}
```

## 嵌套路由要在 VueRouter 的参数中使用 children
```
const router = new VueRouter({
routes: [
path: '/user/:id', component: User,
children: [
// 当 /user/:id/profile 匹配成功，
// UserProfile 会被渲染在 User 的 <router-view> 中
path: 'profile',
component: UserProfile
]
]
})
```

当你访问 /user/foo 时，User 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：
```
const router = new VueRouter({
routes: [
{
path: '/user/:id', component: User,
children: [
// 当 /user/:id 匹配成功，
// UserHome 会被渲染在 User 的 <router-view> 中
{ path: '', component: UserHome },

// ...其他子路由
]
}
]
})
```

## 编程式的导航

注意：在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push。

想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link :to="..."> 等同于调用 router.push(...)。

### router.push('home')
声明式：<router-link :to="">
编程式：router.push(...)

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
```
// 字符串
router.push('home')

// 对象
router.push({path: 'home'})

// 命名的路由
router.push({name: 'user', params: {userId: '123'}})

// 带查询参数，变成 /register?plan=private
router.push({path: 'rigister', query: {plan: 'private'}})
```

注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
```
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

### router.replace(location, onComplete?, onAbort?)
声明式：<router-link :to="..." replace>
编程式：router.replace(...)

跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

### router.go(n)
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

```
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

## 命名路由
就是我用过的方式，给一个 name，传到 router-link 里去。
```
const router = new VueRouter({
routes: [
{
path: '/user/:userId',
name: 'user',
component: User
}
]
})

<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

## 命名视图
有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 sidebar (侧导航) 和 main (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。

## 重定向
看文档就行。
```
// 方式一：
const router = new VueRouter({
routes: [
{path: '/', redirect: '/b'}
]
})

// 方式二：
const router = new VueRouter({
routes: [
{path: '/a', redirect: {name: 'foo'}}
]
})

// 方式三：
const router = new VueRouter({
routes: [
{path: '/', redirect: to => {
// 方法接收 目标路由 作为参数
// return 重定向的 字符串路径/路径对象
}}
]
})
```

## 路由组件传参
在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

原来是这样的：
```
const User = {
template: '<div>User {{$toute.params.id}}</div>'
}

const router = new VueRouter({
    routes: [
        {path: '/user/:id', component: User}
    ]
})
```

通过 props 解耦
```
const User = {
    props: ['id'],
    template: '<div> User {{ id }}</div>'
}

const router = new VueRouter({
    routes: [
        { path: '/user/:id', component: User, props: true }
    ]
})
```

## HTML5 History 模式
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。

```
const router = new VueRouter({
    mode: 'history',
    routes: [...]
})
```

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。
