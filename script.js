 
const socket = io("http://localhost:3000");
const messageContainer = document.querySelector(".chat");
const messageForm = document.querySelector(".sending");
const messageInput = document.querySelector(".msg-input");

// const appendMessage = (message) => {
//     const messageElement = document.createElement('div')
//     messageElement.innerText = message
//     messageContainer.append(messageElement)
//     }

const uname = prompt('Podaj imie / nick')
appendMessage('Dołączyłeś!')
socket.emit('new-user', uname)

socket.on('chat-message', data => {
  appendMessage(`${data.uname}: ${data.message}`)
})

socket.on('user-connected', uname => {
  appendMessage(`${uname} dołączył do czatu`)
})

socket.on('user-disconnected', uname => {
  appendMessage(`${uname} rozłączył się :()`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`Ty: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
