function red() {
    console.log('red')
}
function green() {
    console.log('green')
}
function yellow() {
    console.log('yellow')
}

const task = (time, light, cb) => {
    setTimeout(() => {
        if (light == 'red') {
            red()
        } else if (light == 'green') {
            green()
        } else {
            yellow()
        }
        cb()
    }, time)
}
const temp = () => {
    task(3000, 'red', () => {
        task(1000, 'green', () => {
            task(2000, 'yellow', () => {
                temp()
            })
        })
    })
}
// temp()

const promiseTask = (time, light) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (light == 'red') {
                red()
            } else if (light == 'green') {
                green()
            } else {
                yellow()
            }
            resolve()
        }, time)
    })
}
const step = () => {
    promiseTask(3000, 'red')
        .then(() => {
            promiseTask(1000, 'green')
        })
        .then(() => {
            promiseTask(2000, 'yellow')
        })
        .then(() => {
            step()
        })
}
// step()

const generator = function* () {
    yield promiseTask(3000, 'red')
    yield promiseTask(1000, 'green')
    yield promiseTask(2000, 'yellow')
    yield generator()
}
const generatorObj = generator()
// generatorObj.next()
// generatorObj.next()
// generatorObj.next()
