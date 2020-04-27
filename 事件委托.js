// 错误版（但是可能能过）
 ul.addEventListener('click', function(e){
     if(e.target.tagName.toLowerCase() === 'li'){
         fn() // 执行某个函数
     }
 })
// bug 在于，如果用户点击的是 li 里面的 span，就没法触发 fn，这显然不对。

// 高级版
 function delegate(element, eventType, selector, fn) {
     element.addEventListener(eventType, e => {
       let el = e.target
       while (!el.matches(selector)) {
         if (element === el) {
           el = null
           break
         }
         el = el.parentNode
       }
       el && fn.call(el, e, el)
     })
     return element
   }
// 思路是点击 span 后，递归遍历 span 的祖先元素看其中有没有 ul 里面的 li。