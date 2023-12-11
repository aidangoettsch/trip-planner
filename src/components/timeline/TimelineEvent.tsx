import {FC} from "react";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from "@mui/lab";
import {ConnectionType, EventType, isAttraction, TripEvent} from "../../types/event";
import {FlightTakeoff, Train} from "@mui/icons-material";
import {Box, Paper, Typography} from "@mui/material";
import EventCard from "./EventCard";
import {intervalToDuration, formatDuration, Locale, format} from "date-fns";

const iconMap = {
  [EventType.Attraction]: null,
  [EventType.Connection]: {
    [ConnectionType.Flight]: FlightTakeoff,
    [ConnectionType.Drive]: null,
    [ConnectionType.Train]: Train,
    [ConnectionType.Bus]: null,
    [ConnectionType.Transit]: Train,
  }
}
const formatDistanceLocale = { xSeconds: '{{count}} sec', xMinutes: '{{count}} min', xHours: '{{count}} h' }
const shortEnLocale = {
  formatDistance: (token: keyof typeof formatDistanceLocale, count: string) =>
    formatDistanceLocale[token].replace('{{count}}', count)
}

const TimelineEvent: FC<{
  event: TripEvent,
  next?: TripEvent
}> = ({event, next}) => {
  const Icon = event.type === EventType.Connection ?
    iconMap[EventType.Connection][event.connectionType] : null

  const eventGapLocation = isAttraction(event) ? event.location : event.endLocation
  const eventGapDuration = next && formatDuration(intervalToDuration({
    start: event.endTime,
    end: next.startTime,
  }), {
    locale: shortEnLocale,
    delimiter: ', '
  })

  const eventGapFill = next && eventGapDuration && <TimelineItem sx={{
    display: "contents",
  }}>
    <TimelineOppositeContent/>
    <TimelineSeparator>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Typography sx={{
        color: (theme) => theme.palette.text.secondary,
        pt: 1,
        pb: 1,
      }}>
        {`${eventGapDuration} at ${eventGapLocation.name}`}
      </Typography>
    </TimelineContent>
  </TimelineItem>

  return (
    <>
      <TimelineItem sx={{
        display: "contents",
      }}>
        <TimelineOppositeContent color="text.secondary" sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          marginTop: 2,
          width: 1,
          flex: "none",
          whiteSpace: "nowrap",
          alignItems: "end",
        }}>
          <Box>{format(event.startTime, "h:mm a")}</Box>
          <Box>{format(event.endTime, "h:mm a")}</Box>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            {Icon && <Icon />}
          </TimelineDot>
          {next && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent sx={{
          width: 1,
        }}>
          <Paper sx={{
            p: 2,
            width: 1,
          }}>
            <EventCard event={event} />
          </Paper>
        </TimelineContent>
      </TimelineItem>
      {eventGapFill}
    </>
  )
}

export default TimelineEvent
