function promiseAll(promiseList) {
    return new Promise((resolve, reject) => {
        let result = []
        let iteratorIndex = 0
        // 已完成的数量，用于最终的返回，不能直接用完成数量作为iteratorIndex
        // 输出顺序和完成顺序是两码事
        let fullCount = 0
        // 用于迭代interator数据
        for (const item of promiseList) {
            // for of 遍历顺序，用于返回正确顺序的结果
            // 因iterator用forEach遍历后的key和value一样，所以必须存一份for of的 iteratorIndex
            let resultIndex = iteratorIndex
            iteratorIndex += 1
            // 包一层，以兼容非promise的情况
            /**
             * 1因为item不一定都是promise对象,所以要全部转一下,
             * 2因为每个promise成功或者是失败都有回调,所以我们要去拿到每一个prmoise的返回状态
             * 3拿到每一个prmise的返回状态后不能用push的方式添加到result中,返回结果的顺序需要和pmarr的顺序一致
             * 4当其中有一项prmise返回的失败则整个promise.all就会返回失败,所以直接reject放在第二个参数中,
             *    只要失败一个并返回失败终止循环
             * 5判断迭代器是否都执行完,全部执行完后返回成功
             */
            Promise.resolve(item)
                .then((res) => {
                    result[resultIndex] = res
                    fullCount += 1
                    console.log(resultIndex, fullCount, iteratorIndex)
                    // Iterator 接口的数据无法单纯的用length和size判断长度，不能局限于Array和 Map类型中
                    if (fullCount === iteratorIndex) {
                        resolve(result)
                    }
                })
                .catch((err) => {
                    reject(err)
                })
        }
        // 处理空 iterator 的情况
        if (iteratorIndex === 0) {
            resolve(result)
        }
    })
}
if (!Promise.all) Promise.all = promiseAll

let p1 = Promise.resolve(2)
let p2 = new Promise((res, rej) => {
    setTimeout(() => {
        res(3)
    }, 1000)
})
let p3 = Promise.resolve(4)
promiseAll([p1, p2, p3, 5])
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
