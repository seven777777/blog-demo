let product = { price: 5, quantity: 2 }
let salePrice = 0
let total = 0

let effect = () => (total = product.price * product.quantity)

function track(target, value) {}
