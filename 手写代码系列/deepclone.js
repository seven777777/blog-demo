/**
 * 实现深拷贝
 * 1. 判断循环引用
 * 2. 判断正则对象
 * 3. 判断日期对象
 * 4. 属性对象直接进行递归拷贝
 * 5. 考虑拷贝时不丢失原本对象的原型继承关系
 * 6. 考虑拷贝时的属性修饰符
 * 参考：https://zhuanlan.zhihu.com/p/458663404
 */
function cloneDeep(value, map = new WeakMap()) {
    if (value.constructor === Date) {
        return new Date(value)
    }
    if (value.constructor === RegExp) {
        return new RegExp(value)
    }
    // 如果value是普通类型，直接返回
    if (typeof value !== 'object' || value === null) {
        return value
    }
    // 考虑对象的原型，获得原本对象的原型 创建一个新对象继承这个对象的原型
    const prototype = Object.getPrototypeOf(value)
    // 拷贝时不能丢失对原有对象的属性描述符
    const description = Object.getOwnPropertyDescriptors(value)
    // 创建新的空对象，同时继承原有对象原型 同时拥有对应的描述符
    const object = Object.create(prototype, description)
    // 遍历对象的属性进行拷贝 Reflect.ownKeys 遍历获取自身的不可枚举以及key为symbol的属性
    map.set(value, object)
    Reflect.ownKeys(value).forEach((key) => {
        // key是普通类型
        if (typeof key !== 'object' || key === null) {
            // 直接覆盖
            object[key] = value[key]
        } else {
            //  解决循环引用的关键是 每一个对象都给他存放在weakMap中 因为WeakMap是一个弱引用
            //  每次如果进入是对象 那么就把这个对象 优先存放在weakmap中 之后如果还有引用这个对象的地方 直接从weakmap中拿出来 而不需要再进行遍历造成爆栈
            //  同理，如果使用相同引用为了保证同一份引用地址的话 可以使用weakMap中直接拿出保证同一份引用
            //  这里判断之前是否存在相同的引用 如果存在相同的引用直接返回引用即可
            const mapValue = map.get(value)
            mapValue ? (object[key] = map.get(value)) : (object[key] = cloneDeep(value[key]))
        }
    })
    return object
}

let obj = {
    age: 18,
    name: 'seven',
    boolean: true,
    empty: undefined,
    nul: null,
    customObj: { name: 'seven', github: 'https://github.com/seven777777' },
    customArr: [0, 1, 2],
    customFn: () => console.log('seven'),
    date: new Date(100),
    reg: new RegExp('/seven/ig'),
    [Symbol('hello')]: 'Welcome follow my github!'
}
// 定义不可枚举属性
Object.defineProperty(obj, 'innumerable', {
    enumerable: false,
    value: '不可枚举属性'
})
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj //设置循环引用属性
let cloneObj = cloneDeep(obj)
cloneObj.customArr.push(4)

console.log(cloneDeep(obj))
console.log(cloneDeep(obj) === obj)
// 注意不可以枚举属性是无法被打印显示出来的 我们可以通过Reflect.ownKeys进行验证
Reflect.ownKeys(cloneDeep(obj)).forEach((key) => console.log(key))
