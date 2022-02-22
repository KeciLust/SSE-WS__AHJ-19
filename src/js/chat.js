import addMessageChat from './addMessageChat';
import Api from './Api';
import time from './time';

export default function chat(name) {
  const ws = new WebSocket('ws://localhost:7070/ws');
  const input = document.querySelector('.inputChat');
  const button = document.querySelector('.buttonChat');

  ws.binaryType = 'blob';

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const message = {
      name: `${name}`,
      time: `${time()}`,
      text: `${input.value}`,
    };
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
    input.value = '';
  });
  ws.addEventListener('message', (evt) => {
    console.log(123);
    const read = new FileReader();
    read.readAsText(evt.data);
    read.onload = () => {
      const message = JSON.parse(read.result);
      if (message.name !== name) {
        addMessageChat(message);
      } else {
        message.name = 'Вы';
        addMessageChat(message);
      }
    };
  });
  ws.addEventListener('close', (evt) => {
    const api = new Api();
    api.remove(name);
    console.log(evt);
  });
  ws.addEventListener('error', () => {
    console.log('error');
  });
}
