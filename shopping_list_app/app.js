//Single state object
var state = {
	items: []
};

//State modification functions
function addItem (state, item){
	state.items.push(item);
}

function deleteItem(state, itemIndex){
	state.items.slice(itemIndex, 1);
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
	$('.shopping-list').click(function(event){
    event.preventDefault();
		var itemIndex = $(this).closest('li').index();
    console.log($(this))
    alert(itemIndex);
    //deleteItem(state, itemIndex);
		//renderList(state, $('.shopping-list'));
	})

}

$(handleAddItem);
$(handleDeleteItem);
