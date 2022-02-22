import addItemNickname from './addItemNickname';
import Api from './Api';
import chat from './chat';

export default async function chatConnect(name) {
  const api = new Api('http://localhost:7070/contacts');
  const response = await api.load();
  const data = await response.json();

  data.forEach((el) => {
    if (el.name !== name) {
      addItemNickname(el.name);
    } else { addItemNickname('Вы'); }
  });
  chat(name);
}
