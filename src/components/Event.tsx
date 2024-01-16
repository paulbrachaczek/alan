import { Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {Typography} from "@material-ui/core";
import Event from "../models/Event";

const EventPage = () => {
    const { id } = useParams();
    const event: Event = (useSelector((state: RootState) => state.events.find((ev: any) => id && ev.id === +id))) as unknown as Event;

    
    if (!event) {
        return (
          <section>
            <h2>Post not found!</h2>
          </section>
        )
      }

    return (
        <>
            <Typography component="h3" variant="h3">{event.title}</Typography>
            <p>when: {event.date}</p>
            <figure>
              <img src={event.picture} alt={event.title} />
            </figure>
            <p>
              contact: {event.email}
              tel: {event.phone}
            </p>
            <address>
              {event.address}
            </address>
            {event.type}
            <p>
              {event.description}
            </p>
        </>
    );
}
export default EventPage;