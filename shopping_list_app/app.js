//Single state object
var state = {
	items: []
};

//State modification functions
function addItem (state, item){
	state.items.push(item);
}

function deleteItem(state, itemIndex){
	state.items.splice(itemIndex, 1);
}

function getItem(state, itemIndex){
  state.items[itemIndex];
}


//Render functions
function renderList (state, element){
	var itemsHTML = state.items.map(function(item){
		return '<li>' +
        '<span class="shopping-item">' + item + '</span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
      '</li>';
	});
	element.html(itemsHTML);
}

//Event listeners
function handleAddItem(){
	$('#js-shopping-list-form').submit(function(event){
		event.preventDefault();
		addItem(state, $('#shopping-list-entry').val());
		renderList(state, $('.shopping-list'));
	})
}

function handleDeleteItem(){
	$('.shopping-list').on('click', '.shopping-item-delete', (function(event){
    var itemIndex = $(this).closest('li').index();
    console.log(itemIndex);
    deleteItem(state, itemIndex);
		renderList(state, $('.shopping-list'));
	}))

}

function handleUpdateItem(){
  $('.shopping-list').on('click', '.shopping-item-toggle', (function(event){
    var checkItem = $(this).closest('li');
    checkItem.toggleClass('shopping-item__checked');
  }))
}

$(handleAddItem);
$(handleDeleteItem);
$(handleUpdateItem);
