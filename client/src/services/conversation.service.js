import axios from "axios";

const API_URL = "/api/messages/";

const getConversations = () => {
  return axios.get(`${API_URL}conversations`)
    .then((res) => res.data)
    .catch(err => console.log("Error getting conversations: " + err))
};

const getConversationMessages = (id) => {
  return axios.get(`${API_URL}conversations/conversationId?userId=${id}`)
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

const sendMessage = (to, body) => {
  return axios.post(`${API_URL}`, {
    to: to,
    body: body
  })
    .then(res => res.data)
    .catch(err => console.log("Error sending message: " + err))
}

const auth = {
  findConversation,
  getConversations,
  getConversationMessages,
  sendMessage
}

export default auth;