import {
  ListItem
} from "@material-ui/core";

import UserMessage from "./UserMessage";
import FriendMessage from "./FriendMessage";

import moment from "moment";

export default function Message(
  { content,
    recipient,
    isTyping
  })
    {

  const {
    date,
    body,
    media,
    from,
    isSeen
  } = content;


  let isReceived = from === recipient._id;

  const convertToMilitary = (timeStamp) => {
    return moment(date).format("hh:mm")
  }

  let time = convertToMilitary(date);

  return (
    <ListItem >
      {isReceived
        ? <FriendMessage
          media={media || ''}
          message={body}
          timeStamp={time}
          isTyping={isTyping}
          recipient={recipient}
          /> :
        <UserMessage
          media={media || ''}
          message={body}
          timeStamp={time}
          isSeen={isSeen}
          recipient={recipient}
        />
        }
    </ListItem>
  )
}