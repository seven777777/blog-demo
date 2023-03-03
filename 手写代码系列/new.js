function test(name, age) {
    this.name = name
    this.age = age
}
let testRes = new test('seven', 18)
console.log(testRes)

function myNew(fun, ...args) {
    let obj = {}
    obj.__proto__ = fun.prototype
    let res = fun.apply(obj, args)
    if (res instanceof Object) {
        return res
    } else {
        return obj
    }
}
let myNewRes = myNew(test, 'bob', 12)
console.log(myNewRes)
