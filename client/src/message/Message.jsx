import {
  ListItem
} from "@material-ui/core";

import UserMessage from "./UserMessage";
import FriendMessage from "./FriendMessage";

export default function Message(props) {

  const { timeStamp, message, isReceived, isSeen, isTyping, media } = props;

  return (
    <ListItem >
      {isReceived
        ? <FriendMessage
          media={media}
          message={message}
          timeStamp={timeStamp}
          isTyping={isTyping}
          /> :
        <UserMessage
          media={media}
          message={message}
          timeStamp={timeStamp}
          isSeen={isSeen}
        />
        }
    </ListItem>
  )
}