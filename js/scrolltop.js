/**
 * 顶部滚动条类
 * 说明：
 * 1. 提供一个dom id
 * 2. 确保内部只有一个子元素
 */

class TopScroll {
    constructor(el = 'MyScroll') {
        this.el = el
        // 外层盒子
        this.box = document.getElementById(this.el)
        let children = [].filter.call(this.box.childNodes, (e) => e.nodeName != '#text')
        // 内层盒子
        this.innerBox = children[0]
        this.init()
    }
    init() {
        this.initTopScrollDom()
    }
    initTopScrollDom() {
        const scrollHeight = this.box.offsetHeight - this.box.clientHeight + 'px'
        // 如果高度为零，则说明没有生成滚动条，则不需要以下操作
        if (scrollHeight == '0px') return

        //新增顶部滚动条盒子
        let topScrollBox = document.createElement('div')
        topScrollBox.style.position = 'absolute'
        topScrollBox.style.left = 0
        topScrollBox.style.bottom = '100%'
        topScrollBox.style.right = 0
        topScrollBox.style.height = scrollHeight
        topScrollBox.style.overflow = 'auto'
        // 顶部滚动条盒子内部元素
        // 需设置其宽度与实际滚动部分宽度相同
        let topScrollInner = document.createElement('div')
        topScrollInner.style.width = this.innerBox.clientWidth + 'px'
        topScrollInner.style.height = scrollHeight
        topScrollBox.appendChild(topScrollInner)

        // 在原来的div外面套一层div，用来增加新的顶部滚动条盒子
        let wrapBox = document.createElement('div') //新增外层div
        this.box.parentNode.insertBefore(wrapBox, this.box.nextElementSibling)
        wrapBox.style.width = this.box.offsetWidth + 'px'
        wrapBox.style.height = this.box.offsetHeight + 'px'
        wrapBox.style.position = 'relative'
        wrapBox.appendChild(topScrollBox)
        wrapBox.appendChild(this.box)

        console.log(this.box, this.innerBox)
        // 滚动监听，实现同步滚动
        this.scrollListener(topScrollBox, this.box)
    }
    scrollListener(scroll1, scroll2) {
        scroll1.addEventListener('scroll', function (e) {
            //使用比例来实现同步滚动
            var scale = (scroll1.scrollWidth - scroll1.clientWidth) / (scroll2.scrollWidth - scroll2.clientWidth)
            scroll2.scrollLeft = scroll1.scrollLeft / scale
        })
        scroll2.addEventListener('scroll', function (e) {
            //使用比例来实现同步滚动
            var scale = (scroll2.scrollWidth - scroll2.clientWidth) / (scroll1.scrollWidth - scroll1.clientWidth)
            scroll1.scrollLeft = scroll2.scrollLeft / scale
        })
    }
}

class TopBarScroll {
    vH = document.body.scrollHeight //页面整个页面高度
    cH = document.documentElement.clientHeight //窗口可视高度
    constructor(color) {
        this.color = color || '#3498db'
    }
    el = null
    createDiv() {
        this.el = document.createElement('div')
        this.el.className = 'barTop'
        this.el.style.backgroundColor = this.color
        document.body.appendChild(this.el)
    }
    init() {
        let fag = this.hasScrollbar()
        if (fag) {
            this.createDiv()
            window.onscroll = this.scroll.bind(this)
        }
    }
    scroll() {
        //window 滚动事件
        let sH = this.getScrollTop()
        let s = this.getPercent(sH, this.vH - this.cH)
        this.el.style.width = s
    }
    getScrollTop() {
        //滚动条距上距离
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
            scrollTop = document.body.scrollTop
        }
        return scrollTop
    }
    getPercent(num, total) {
        //获取百分比
        num = parseFloat(num)
        total = parseFloat(total)
        if (isNaN(num) || isNaN(total)) {
            return '-'
        }
        return total <= 0 ? '0%' : Math.round((num / total) * 10000) / 100.0 + '%'
    }
    hasScrollbar() {
        //判断是否有滚动条，如果没有就不生成DIV元素
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)
    }
}
