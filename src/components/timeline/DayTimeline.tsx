import {FC} from "react";
import {Timeline,} from "@mui/lab";
import {ConnectionType, EventType, TripEvent} from "../../types/event";
import TimelineEvent from "./TimelineEvent";

const events: TripEvent[] = [
  {
    id: "0",
    type: EventType.Connection,
    connectionType: ConnectionType.Flight,
    startTime: new Date("2022-11-04T14:51-04:00"),
    endTime: new Date("2022-11-04T16:21-04:00"),
    startLocation: {
      name: "Detroit Metro Airport",
      lat: 0.0,
      long: 0.0,
      portMode: ConnectionType.Flight,
      metroName: "Detroit, MI",
      code: "DTW",
    },
    endLocation: {
      name: "Washington Dulles International Airport",
      lat: 0.0,
      long: 0.0,
      portMode: ConnectionType.Flight,
      metroName: "Washington Dulles",
      code: "IAD",
    },
    legMeta: {
      legCode: "UA 6018",
      carrierImage: "/carriers/united.png"
    }
  },
  {
    id: "1",
    type: EventType.Connection,
    connectionType: ConnectionType.Flight,
    startTime: new Date("2022-11-04T18:00-04:00"),
    endTime: new Date("2022-11-04T21:00-07:00"),
    startLocation: {
      name: "Washington Dulles International Airport",
      lat: 0.0,
      long: 0.0,
      portMode: ConnectionType.Flight,
      metroName: "Washington Dulles",
      code: "IAD",
    },
    endLocation: {
      name: "San Francisco International Airport",
      lat: 0.0,
      long: 0.0,
      portMode: ConnectionType.Flight,
      metroName: "San Francisco, CA",
      code: "SFO",
    },
    legMeta: {
      legCode: "UA 1357",
      carrierImage: "/carriers/united.png"
    }
  },
  {
    id: "2",
    type: EventType.Connection,
    connectionType: ConnectionType.Transit,
    startTime: new Date("2022-11-04T21:18-07:00"),
    endTime: new Date("2022-11-04T22:06-07:00"),
    startLocation: {
      name: "San Francisco International Airport",
      lat: 0.0,
      long: 0.0,
      portMode: ConnectionType.Flight,
      metroName: "San Francisco, CA",
      code: "SFO",
    },
    endLocation: {
      name: "San Francisco Marriott Union Square",
      lat: 0.0,
      long: 0.0,
    },
    legMeta: [
      {
        legCode: "Blue Line",
        legCodeColor: "blue",
        startTime: new Date("2022-11-04T21:21-07:00"),
        endTime: new Date("2022-11-04T21:24-07:00"),
      },
      {
        legCode: "Blue Line",
        legCodeColor: "blue",
        startTime: new Date("2022-11-04T21:21-07:00"),
        endTime: new Date("2022-11-04T21:24-07:00"),
      }
    ]
  },

]

const DayTimeline: FC = () => {
  return (
    <Timeline sx={{
      display: "grid",
      gridTemplateColumns: "auto 32px 1fr",
      p: 0,
    }}>
      {events.map((e, i) => <TimelineEvent event={e} next={i === events.length - 1 ? undefined : events[i + 1]} key={e.id}/>)}
    </Timeline>
  )
}

export default DayTimeline
