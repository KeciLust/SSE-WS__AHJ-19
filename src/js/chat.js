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
    if (ws.readyState === WebSocket.CLOSED) {
      console.log(evt);
      ws.close();
      const api = new Api('http://localhost:7070/contacts');
      api.remove(name);
    }
  });
  ws.addEventListener('error', () => {
    console.log('error');
  });
}
