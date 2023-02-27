function curry(fn) {
    // 保存预置参数
    const presetArgs = [].slice.call(arguments, 1)
    // 返回一个新函数
    function curried() {
        // 新函数调用时会继续传参
        const restArgs = [].slice.call(arguments)
        const allArgs = [...presetArgs, ...restArgs]
        return curry.call(null, fn, ...allArgs)
    }
    // 重写toString
    curried.toString = function () {
        return fn.apply(null, presetArgs)
        // 下面这个是一样的
        // return fn.call(null, ...presetArgs)
    }
    return curried
}

function fn() {
    return [...arguments].reduce((prev, curr) => {
        return prev + curr
    }, 0)
}
var add = curry(fn)
console.log(add(1)(2)(3)(4, 5) / 1) // 15
