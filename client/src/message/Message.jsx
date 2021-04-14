import {
  ListItem
} from "@material-ui/core";

import UserMessage from "./UserMessage";
import FriendMessage from "./FriendMessage";

export default function Message(
  { content,
    recipient })
    {

  const {
    timeStamp,
    message,
    media,
    isReceived,
    isSeen,
    isTyping
  } = content;

  return (
    <ListItem >
      {isReceived
        ? <FriendMessage
          media={media}
          message={message}
          timeStamp={timeStamp}
          isTyping={isTyping}
          recipient={recipient}
          /> :
        <UserMessage
          media={media}
          message={message}
          timeStamp={timeStamp}
          isSeen={isSeen}
          recipient={recipient}
        />
        }
    </ListItem>
  )
}