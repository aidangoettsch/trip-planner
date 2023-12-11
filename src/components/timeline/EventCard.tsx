import {FC} from "react";
import {CarrierMetadata, Connection, isConnection, TripEvent} from "../../types/event";
import {IntercityPort, isIntercityPort} from "../../types/location";
import {Box, Typography} from "@mui/material";
import ConnectionArrow from "../util/ConnectionArrow";

const ConnectionCardMetaHeader: FC<{
  meta: CarrierMetadata
}> = ({meta}) => {
  return <Box sx={{
    display: "flex",
    flexDirection: "row",
    gap: 1,
    alignItems: "center",
  }}>
    {meta.carrierImage && <img height={"16px"} src={meta.carrierImage} alt={meta.legCode}/>}
    <Typography>{meta.legCode}</Typography>
  </Box>
}

const ConnectionCard: FC<{
  conn: Connection
}> = ({conn}) => {
  const intercityTrip = isIntercityPort(conn.startLocation) && isIntercityPort(conn.endLocation)
  const startLocationName = intercityTrip ? (conn.startLocation as IntercityPort).metroName : conn.startLocation.name
  const endLocationName = intercityTrip ? (conn.endLocation as IntercityPort).metroName : conn.endLocation.name

  const showMetaBody = Array.isArray(conn.legMeta)
  const showMetaHeader = !!conn.legMeta && !showMetaBody

  return <>
    {showMetaHeader && <ConnectionCardMetaHeader meta={conn.legMeta as CarrierMetadata}/>}
    <Box sx={{
      display: "flex",
      flexDirection: "row",
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
      }}>
        <Typography variant={"h6"}>{startLocationName}</Typography>
        {"code" in conn.startLocation && intercityTrip && <Typography variant={"subtitle1"} sx={{
          color: (theme) => theme.palette.text.secondary
        }}>{conn.startLocation.code}</Typography>}
      </Box>
      <ConnectionArrow/>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
      }}>
        <Typography variant={"h6"}>{endLocationName}</Typography>
        {"code" in conn.endLocation && intercityTrip && <Typography variant={"subtitle1"}  sx={{
          color: (theme) => theme.palette.text.secondary
        }}>{conn.endLocation.code}</Typography>}
      </Box>
    </Box>
  </>
}

const EventCard: FC<{
  event: TripEvent
}> = ({event}) => {
  if (isConnection(event)) {
    return <ConnectionCard conn={event} />
  }
  return <>

  </>
}

export default EventCard
