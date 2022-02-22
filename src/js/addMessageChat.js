export default function addMessageChat(message) {
  const chatList = document.querySelector('.chatList');
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chatMessage');
  if (message.name === 'Вы') {
    chatMessage.classList.add('youChatMessage');
    chatMessage.classList.remove('chatMessage');
  }
  chatMessage.innerHTML = `<div class="nicknameChat">${message.name}</div>
                           <div class="time">${message.time}</div>
                           <div class="messageText">${message.text}</div>`;
  chatList.append(chatMessage);
}
