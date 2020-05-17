## 简述

- async函数返回一个 Promise 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

- async函数内部return语句返回的值，会成为then方法回调函数的参数。



```
async function fn(value, ms){
  await xxx()
  console.log(value)
}

function xxx(ms){
  return new Promise((resolve)=>{
    setTimeout(resolve, ms)
  })
}
```

- 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

## 用 async await 实现休眠效果
```
// 先写一个需要用的 await 函数
function sleep(interval){
  return new Promise((resolve)=>{
    setTimeout(resolve, interval)
  })
}

async function xxx(){
  for(let i=1; i <= 5; i++>){
    console.log(i)
    await sleep(1000)
  }
}

xxx()
```

## 如何处理错误？
```
async function f(){
  await Promise.reject('出错了')
}

f()
  .then( v => console.log(v) )
  .catch( e => console.log(e) )
```

- 或者放在 try catch 代码块中也可以
```
async function f(){
  try{
    const value1 = await one()
    const value2 = await two()
    const value3 = await three()

    console.log('Final', val3)
  }catch(err){
    console.error(err)
  }
}
```

## 其他
- 任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。
```
async function f(){
  await Promise.reject('wrong')
  await Promise.resolve('hello world')  // 不会执行
}
```

- 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
```
async function f(){
  try{
    await Promise.reject('wrong')
  }catch(e){
    console.log(e)
  }
  return await Promise.resolve('hello world')
}

f()
  .then( v => console.log(v) )  // hello world
```

- 另一种方法是接一个 .catch 方法
```
async function f(){
  await Promise.reject('went wrong')
    .catch( e => console.log(e) )
  return await Promise.resolve('hello world')
}

f()
  .then( v => console.log(v) )
```

## 如果不存在继发关系，就让他们同时触发
```
let foo = await getFoo()
let bar = await getBar()
```

上面的写法，getFoo 完成后，才执行 getBar，我们完全可以让他们同时触发，这是就缩短程序执行时间。写法如下：

```
let [foo, bar] = await Promise.all([getFoo(), getBar()])
```
