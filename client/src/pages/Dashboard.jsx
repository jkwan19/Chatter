import {
  useContext,
  useEffect,
  useState
} from "react";
import {
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/AuthContext";

import Status from "../profile/Status";
import ChatHeader from "../chat/ChatHeader";
import MessageHeader from "../chat/MessageHeader";
import Name from "../profile/Name";
import SearchBar from "../search/SearchBar";
import ChatList from "../chat/ChatList";
import LogoutMenu from "../menu/LogoutMenu";
import Messenger from "../chat/Messenger";
import friendsList from "./friends.json";

const useStyles = makeStyles(theme => ({
  '@global': {
    '*::-webkit-scrollbar': {
      display: 'none'
    }
  },
  chat: {
    maxHeight: '50vh',
    position: 'relative'
  },
  chatSection: {
    height: '100%',
  },
  chatBorder: {
    borderRight: '1px none #e0e0e0'
  },
  conversationList: {
    padding: '1px 10px',
  },
  label: {
    padding: theme.spacing(1)
  },
  messengerSection:{
    paddingLeft: theme.spacing(1)
  },
  profileHeader: {
    alignItems: 'center',
    padding: '12px'
  }
}));


export default function Dashboard() {
  const classes = useStyles();

  const [ friends, setFriends ] = useState([]);
  const [ name, setName ] = useState('santiago');
  const [ status, setStatus ] = useState(false);
  const { loggedIn } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    setFriends(friendsList);
  }, [history]);

  const handleChat = (e) => {
    const id = e.target.offsetParent.id || e.target.id;
    const user = friends[id - 1];
    const { name, isOnline } = user;
    setName(name)
    setStatus(isOnline);
  }


  return (
    <Grid container
      className={classes.chat}
      >
      {/* Column one for users and profile*/}
      <Grid container
        className={classes.chatSection} >
        <Grid
          item xs={3}
          variant="elevation"
          className={classes.borderRight500}>
          <Grid
            item
            className={classes.conversationList}
            >
            <Grid
              container
              className={classes.profileHeader}
              direction='row'
              spacing={2}
              >
              <Status name='thomas' status='online'/>
              <Name name="thomas" />
              <LogoutMenu/>
            </Grid>
            <Grid
              container
              className={classes.label}
              spacing={2}
              >
              <ChatHeader />
            </Grid>
            <SearchBar />
            <ChatList
              friends={friends}
              handleChat={handleChat}
              />
          </Grid>
        </Grid>
        {/* Column two for messages with user*/}
        <Grid
          item xs={9}
          className={classes.messengerSection}
          variant="elevation"
          >
          <MessageHeader
            name={name}
            status={status}
            />
          <Messenger
            name={name}
            />
        </Grid>
      </Grid>
    </Grid>
  );
}
