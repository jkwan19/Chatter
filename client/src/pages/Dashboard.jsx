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

const useStyles = makeStyles(theme => ({
  chat: {
    maxHeight: '50vh'
  },
  chatSection: {
  },
  chatBorder: {
    borderRight: '1px none #e0e0e0'
  },
  conversationList: {
    padding: '1px 10px'
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

  const [ name, setName ] = useState('santiago')
  const { loggedIn } = useContext(AuthContext)
  const history = useHistory();

  useEffect(() => {
    // if (!loggedIn) history.push('/login')
  }, [history]);

  const handleChat = (e) => {
    const name = e.target.offsetParent.id || e.target.id;
    setName(name)
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
            <ChatList handleChat={handleChat}/>
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
            />
          <Messenger />
        </Grid>
      </Grid>
    </Grid>
  );
}
