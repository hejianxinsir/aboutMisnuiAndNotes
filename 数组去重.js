
// 方法一 for i j
function unique(arr){            
  for(var i=0; i<arr.length; i++){
    for(var j=i+1; j<arr.length; j++){
        if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
            arr.splice(j,1);
            j--;
        }
    }
  }

  return arr;
}

// 方法二 indexOf(arr[i]===-1)
function single(arr){
  if(!Array.isArray(arr)){
    console.log('请输入一个数组')
    return 
  }

  let array = []
  for(let i=0; i<arr.length; i++){
    if(array.indexOf(arr[i]) === -1){
      array.push(arr[i])
    }
  }

  return array
}

// ES6 
function xxx(arr){
  return Array.from(new Set(arr))
}

// 或
function yyy(arr){
 return [...new Set(arr)]
}