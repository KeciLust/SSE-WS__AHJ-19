import Api from './Api';
import chatConnect from './chatConnect';

export default function checkNickname() {
  const modul = document.querySelector('.modul');
  const input = document.querySelector('.modulInput');
  const button = document.querySelector('.modulButton');
  const api = new Api('http://localhost:7070/contacts');

  button.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!input.value) {
      document.querySelector('.modulNotNickname').style.display = 'block';
    } else {
      document.querySelector('.modulNotNickname').style.display = 'none';
      const response = await api.load();
      const data = await response.json();
      const index = await data.findIndex(({ name }) => name === input.value);

      if (index !== -1) {
        document.querySelector('.modulInvalidNickname').style.display = 'block';
      } else {
        document.querySelector('.modulInvalidNickname').style.display = 'none';
        modul.style.display = 'none';
        await api.add({ name: `${input.value}` });

        document.querySelector('.container').style.display = 'flex';
        chatConnect(`${input.value}`);
      }
      input.value = '';
    }
  });
}
