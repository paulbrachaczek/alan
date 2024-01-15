// React App
import { useEffect } from "react";
// Material-UI Imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchEvents } from "../redux/eventSlice";
import { useNavigate } from "react-router-dom";
import Event from "../models/Event";

const Home = () => {
  //React Hooks
 // const [todoDescription, setTodoDescription] = useState("");

  //React Redux Hooks
 // const todoList = useSelector((state: RootState) => state);
  useEffect(() => {
    dispatch(fetchEvents())
  }, []);
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state)
  const eventsList: Event[] = events.events as [];
  const navigate = useNavigate();
  //Rendering
  return (
    <List>
      {!events.loading && eventsList.map((event: Event) => (
        <ListItem key={event.id}>
          <ListItemText>{event.title}</ListItemText>
          <Button variant="contained" onClick={() => navigate(`event/${event.id}`)}>Details</Button>
        </ListItem>
      ))}
    </List>
  );
}

export default Home;
