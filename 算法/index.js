/**
 * 两数之和
 * 题目： 给定一个数组 nums 和一个目标值 target，在该数组中找出和为目标值的两个数
 * 输入： nums: [8, 2, 6, 5, 4, 1, 3] ； target:7
 * 输出： [2, 5]
 */
function twoNumAdd(arr, target) {
    if (Array.isArray(arr)) {
        let map = {}
        for (let i = 0; i < arr.length; i++) {
            if (map[target - arr[i]] !== undefined) {
                return [arr[i], target - arr[i]]
            } else {
                map[arr[i]] = i
            }
        }
    }
    return []
}
console.log(twoNumAdd([8, 2, 6, 5, 4, 1, 3], 7))

/**
 * 三数之和
 * 题目： 给定一个数组nums，判断 nums 中是否存在三个元素a，b，c，使得 a + b + c = target，找出所有满足条件且不重复的三元组合
 * 输入： nums: [5, 2, 1, 1, 3, 4, 6] ；target:8
 * 输出： [[1, 1, 6], [1, 2, 5], [1, 3, 4]]
 */
// 用`双端指针`的方式，将三数之和转化为两数之和
function findThree(arr, target) {
    let res = []
    if (Array.isArray(arr)) {
        arr.sort((a, b) => a - b)
        let len = arr.length
        for (let i = 0; i < len; i++) {
            if (i && arr[i] === arr[i - 1]) continue

            let left = i + 1,
                right = len - 1
            while (left < right) {
                let sum = arr[i] + arr[left] + arr[right]
                if (sum > target) {
                    right--
                } else if (sum < target) {
                    left++
                } else {
                    res.push([arr[i], arr[left++], arr[right--]])
                    while (arr[left] === arr[left - 1]) {
                        left++
                    }
                    while (arr[right] === arr[right + 1]) {
                        right--
                    }
                }
            }
        }
    }
    return res
}
console.log(findThree([5, 2, 1, 1, 3, 4, 6], 8))
