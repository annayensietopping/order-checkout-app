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

  // -------- end of OOP Logic (Classes) ---------
})
