// 数组转树
let data = [
    { id: 0, parentId: null, name: '生物' },
    { id: 1, parentId: 0, name: '动物' },
    { id: 2, parentId: 0, name: '植物' },
    { id: 3, parentId: 0, name: '微生物' },
    { id: 4, parentId: 1, name: '哺乳动物' },
    { id: 5, parentId: 1, name: '卵生动物' },
    { id: 6, parentId: 2, name: '种子植物' },
    { id: 7, parentId: 2, name: '蕨类植物' },
    { id: 8, parentId: 4, name: '大象' },
    { id: 9, parentId: 4, name: '海豚' },
    { id: 10, parentId: 4, name: '猩猩' },
    { id: 11, parentId: 5, name: '蟒蛇' },
    { id: 12, parentId: 5, name: '麻雀' }
]

function array2Tree(arr) {
    let tree = {}
    arr.forEach((item) => {
        if (tree[item.parentId]) {
            tree[item.parentId].push(item)
        } else {
            tree[item.parentId] = [item]
        }
    })
    let result
    arr.forEach((item) => {
        if (item.parentId === null) {
            result = item
        }
        item.children = tree[item.id] || []
    })
    return result
}
function array2Tree2(arr) {
    let result = []
    let map = {}
    if (!Array.isArray(data)) {
        //验证data是不是数组类型
        return []
    }
    data.forEach((item) => {
        //建立每个数组元素id和该对象的关系
        map[item.id] = item //这里可以理解为浅拷贝，共享引用
    })
    data.forEach((item) => {
        let parent = map[item.parentId] //找到data中每一项item的爸爸
        if (parent) {
            //说明元素有爸爸，把元素放在爸爸的children下面
            ;(parent.children || (parent.children = [])).push(item)
        } else {
            //说明元素没有爸爸，是根节点，把节点push到最终结果中
            result.push(item) //item是对象的引用
        }
    })
    return result //数组里的对象和data是共享的
}
console.log(JSON.stringify(array2Tree(data)))
