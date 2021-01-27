const workPlace = document.querySelector('.work-place');
let numberOfItem = 0;
//Создание элемента списка
function createItem(text = 'example') {
  const item = document.createElement('div');
  item.classList.add('item');
  item.innerText = text;
  workPlace.appendChild(item);
  const removeButton = document.createElement('div');
  removeButton.classList.add('remove-button', numberOfItem);
  numberOfItem++;
  removeButton.innerText = 'X';
  item.appendChild(removeButton);
}
//Удаление элемента списка
function deleteItem(number) {
  const items = document.querySelectorAll('.item');
  items[number].classList.add('item-close');
  setTimeout(() => {
    workPlace.removeChild(items[number]);
  }, 700);
  const removeButtons = document.querySelectorAll('.remove-button');
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].classList = '';
    removeButtons[i].classList.add('remove-button', i);
  }
  numberOfItem--;
}

//Функция отвечающая за кнопку добавления дела;
function addItemFunc(number, key = 0) {
  if (number == 1) {
    if (key == 1) {
      const addItem = document.querySelector('.add-item');
      addItem.classList.toggle('add-item');
      addItem.classList.toggle('add-item-long');
      addItem.innerText = '';
    } else {
      const addItem = document.querySelector('.add-item-long');
      addItem.classList.toggle('add-item');
      addItem.classList.toggle('add-item-long');
      addItem.innerText = '+';
    }
  }
  if (number == 2) {
    const addTextItem = document.querySelector('.add-text-item');
    addTextItem.classList.toggle('open');
    addItemButtonOpacity(1);
  }
  if (number == 3) {
    const addTextItem = document.querySelector('.add-text-item');
    addTextItem.classList.toggle('open');
  }
}

//Вешаем обработчик клика на страницу
document.body.onclick = function queryTarget(e) {
  //Отслеживаем кнопку добавление дела
  if (e.target.classList.value == 'add-item') {
    addItemFunc(1, 1);
    addItemFunc(2);
    document.querySelector('.add-text-item').focus();
  }
  //Отслеживаем кнопку закрытия добавления дела
  if (e.target.classList.value.split(' ')[0] == 'remove-button')
    deleteItem(e.target.classList.value.split(' ')[1]);
  if (e.target.classList.value.split(' ')[1] == 'close') {
    addItemFunc(3);
    addItemButtonOpacity();
    addItemFunc(1);
    document.querySelector('.add-text-item').value = '';
  }
  //Отслеживаем кнопку принятия дела
  if (e.target.classList.value.split(' ')[1] == 'acept') {
    const textItem = document.querySelector('.add-text-item');
    textItem.value = textItem.value.trim().substr(0, 85);
    if (textItem.value != '') {
      createItem(textItem.value);
      textItem.value = '';
      addItemFunc(3);
      addItemButtonOpacity();
      addItemFunc(1);
    }
  }
};

//Появление кнопок управления
function addItemButtonOpacity(number = 0) {
  const addItemButton = document.querySelectorAll('.add-item-button');
  if (number == 1) {
    addItemButton.forEach((button) => {
      button.style.display = 'flex';
      setTimeout(() => {
        button.style.opacity = '1';
      }, 700);
    });
  } else {
    addItemButton.forEach((button) => (button.style.display = 'none'));
  }
}
