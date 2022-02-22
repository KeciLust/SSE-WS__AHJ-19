export default function addItemNickname(name) {
  const list = document.querySelector('.listNickname');
  const item = document.createElement('li');
  item.textContent = `${name}`;
  item.classList.add('itemNickname');
  list.append(item);
}
