import axios from "axios";

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
    .then(res => res.data)
    .catch(err => console.log("Error reading message: " + err))
};

const sendMessage = (to, body) => {
  return axios.post(`${API_URL}`, {
    to: to,
    body: body.message
  })
    .then(res => res.data)
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