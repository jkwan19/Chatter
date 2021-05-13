import axios from "axios";
import socket from "../socket";

const API_URL = "/api/messages/";

const getConversations = () => {
  return axios.get(`${API_URL}conversations`)
    .then((res) => res.data)
    .catch(err => console.log("Error getting conversations: " + err))
};

const getConversationMessages = (userId) => {
  return axios.get(`${API_URL}conversations/conversationId?userId=${userId}`)
    .then(res => res.data)
    .catch(err => console.log("Error getting messages: " + err))
}

const findConversation = (username) => {
  return axios.get(`${API_URL}users`, {
    params: {
      username: username
    }
  })
    .then(res => res.data)
    .catch(err => console.log("Error searching: " + err))
};

const readMessage = (conversationId) => {
  return axios.post(`${API_URL}conversations/read`, {
    conversationId
  })
    .then(res => {
      return res.data
    })
    .catch(err => console.log("Error reading message: " + err))
};

const sendMessage = (from, to, body) => {
  let messageContent = {
    from,
    to,
    body: body.message
  }

  return axios.post(API_URL, messageContent)
    .then(res => {
      socket.emit("message", messageContent)
      return res.data
    })
    .catch(err => console.log("Error sending message: " + err))
}

const auth = {
  findConversation,
  getConversations,
  getConversationMessages,
  readMessage,
  sendMessage
}

export default auth;