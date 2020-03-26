$(function () {
  $('#add-item').submit(function (event) {
    event.preventDefault()

    const newItemName = $('#new-item-name').val()
    const newItemPrice = $('#new-item-price').val()
    console.log(newItemName)
    console.log(newItemPrice)

    // clear out the input field
    $('#new-item-name').val('')
    $('#new-item-price').val('')

    addNewItem(newItemName, newItemPrice)
  })

  // -------- **Add New Item** ---------

  function addNewItem (newItemName, newItemPrice) {
    // add new lineItem to Checkout class

    const newItemHtml = buildItemHtml(1, newItemName, newItemPrice)

    $('.table tbody').append(newItemHtml)
  }

  // -------- **INCREMENT / DECREMENT** ---------

  // The listeners below are using jQuery's .on() method
  // and attaching event listeners to the <body>
  // which allows us to listen to events for
  // elements that are dynamically added
  // after the initial page load

  // listen for click event on the "increment" button
  $('body').on('click', '.item button.increment', function () {
    const itemId = $(this).parent().parent().data('id')

    console.log(itemId)
    const itemQty = parseFloat($(this).parent().parent().find('.qty-col').text())

    console.log(itemQty)

    let updatedQty = itemQty + 1
    $(this).parent().parent().find('.qty-col').text(updatedQty)
  })

  // listen for click event on the "increment" button
  $('body').on('click', '.item button.decrement', function () {
    const itemId = $(this).parent().parent().data('id')

    console.log(itemId)
    const itemQty = parseFloat($(this).parent().parent().find('.qty-col').text())

    console.log(itemQty)

    let updatedQty = itemQty - 1
    $(this).parent().parent().find('.qty-col').text(updatedQty)
  })

  // -------- **Remove Item** ---------

  $('body').on('click', '.item button.remove', function () {
    const removedTaskId = $(this).parent().parent().attr('id')

    $(this).parent().parent().remove()
  })

  // -------- Utility Functions ---------

  // html template for an item
  function buildItemHtml (itemId, itemName, itemPrice) {
    return (
      `
      <tr class="item" data-id="${itemId}">

        <td class='name-col'>${itemName}</td>
        <td class='price-col'>${itemPrice}</td>
        <td class='qty-col'>1</td>
        <td class='actions'>
          <button class='increment btn btn-secondary'>+</button>
          <button class='decrement btn btn-secondary'>-</button>
          <button class='remove btn btn-danger'>remove</button>
        </td>
      </tr>
      `
    )
  }

  function generateRandomId () {
    return Math.floor(Math.random() * 1000) + 1
  }

  // -------- OOP Logic (classes) ---------

class Checkout {
  constructor() {
    this._items = []
    this._subtotal = 0
  }

// methods

addItem(item) {
  this._items.push(item)
  }

calculateSubtotal() {
  // use reduce to calculate sum
  this._subtotal = this._items.reduce((sum, item) => {
    return sum = sum + parseFloat(item.price)
  }, 0) }

calculateTax() {
    return this._subtotal * 0.08875
}

calculateTotal() {
  return this._subtotal + this.calculateTax()
  }

incrementQuantity(itemId) {
  // find first item with an id === itemId
const selectedItem =   this._items.find((item) => {
    return item.id ===itemId
  })
  //selectedItem.quantity = selectedItem.quantity + 1
  // this is the fancy way to write it uwu
  selectedItem.quantity++
}

decrementQuantity(itemId) {
  const selectedItem =   this._items.find((item) => {
      return item.id ===itemId
    })
    //selectedItem.quantity = selectedItem.quantity - 1
    // this is the fancy way to write it uwu
    selectedItem.quantity--
}

removeItem (itemId) {
      // find the "index" of element with item.id === itemId
      const selectedIndex = this._items.findIndex((item) => {
        return item.id === itemId
      })
      // use splice to remove the element at the selectedIndex
      this._items.splice(selectedIndex, 1)
    }

}
// end of methods

const checkout = new Checkout()

//////////////////////////////////////////////////////////
// TESTING //
//////////////////////////////////////////////////////

const item1 = { id: 1, name: 'something cool', price: '9.99', quantity: 1}
const item2 = {id: 2, name: 'something not cool', price: '6.99', quantity: 1}

checkout.addItem(item1)
checkout.addItem(item2)
checkout.calculateSubtotal()

console.log(checkout)
console.log(checkout.calculateTax())
console.log(checkout.calculateTotal())

checkout.incrementQuantity(2)
checkout.incrementQuantity(2)
checkout.incrementQuantity(2)
checkout.decrementQuantity(2)
checkout.decrementQuantity(2)
checkout.removeItem(1)


console.log(checkout)
// const items = [
//     {
//       id: 1,
//       name: 'something cool',
//       price: '9.99'
//     },
//     {
//       id: 2,
//       name: 'something else cool',
//       price: '19.99'
//     },
//     {
//       id: 3,
//       name: 'widget',
//       price: '2.99'
//     }
//   ]
//
// const total = items.reduce((sum, item) => {
// return  sum = sum + parseFloat(item.price)
// }, 0)
// console.log(total)
  // -------- end of OOP Logic (Classes) ---------
})
