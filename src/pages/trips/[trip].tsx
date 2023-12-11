import type { NextPage } from 'next'
import {
  Box,
  FormControl,
  IconButton, InputLabel,
  MenuItem,
  Select, SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import {BrowseGalleryOutlined, CalendarMonth, Edit, List, Mail, Share} from "@mui/icons-material";
import DayTimeline from "../../components/timeline/DayTimeline";
import {MouseEvent, useState} from "react";

enum DisplayMode {
  TIMELINE = "timeline",
  CALENDAR = "calendar",
}

const Trip: NextPage = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.TIMELINE)
  // const [timeZone, setTimeZone] = useState<Zone | undefined>()

  // const timeZones = [
  //   IANAZone.create("America/New_York"),
  //   IANAZone.create("America/Los_Angeles"),
  // ]
  //
  // const timeZoneNames = timeZones.map(tz => tz.name)

  const handleDisplayMode = (e: MouseEvent<HTMLElement>, mode: DisplayMode | null) => {
    if (mode !== null) {
      setDisplayMode(mode)
    }
    // if (mode === DisplayMode.CALENDAR && timeZone === undefined) {
    //   setTimeZone(timeZones[0])
    // }
  }

  // const handleTimeZone = (e: SelectChangeEvent) => {
  //   const zoneName = e.target.value
  //
  //   if (zoneName === "Local") {
  //     setTimeZone(undefined)
  //     return
  //   }
  //
  //   const zone = timeZones[timeZoneNames.indexOf(zoneName)]
  //
  //   setTimeZone(zone)
  // }

  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: 1,
      }}>
        <Box>
          <Typography variant={"h3"}>Trip to San Francisco</Typography>
          <Typography variant={"h5"} sx={{
            color: (theme) => theme.palette.text.secondary
          }}>November 4th, 2022 to November 7th, 2022</Typography>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: 1,
          alignItems: "center",
        }}>
          <IconButton><Edit/></IconButton>
          <IconButton><Mail/></IconButton>
          <IconButton><Share/></IconButton>
        </Box>
      </Box>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Box sx={{
          width: 360,
          pt: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
        }}>
          <BrowseGalleryOutlined sx={{
            height: 32,
            width: 32,
          }}/>
          {/*<FormControl fullWidth>*/}
          {/*  <InputLabel id="tz-select-label">Time Zone</InputLabel>*/}
          {/*  <Select*/}
          {/*    labelId="tz-select-label"*/}
          {/*    id="tz-select"*/}
          {/*    value={timeZone ? timeZone.name : "Local"}*/}
          {/*    label="Time Zone"*/}
          {/*    onChange={handleTimeZone}*/}
          {/*  >*/}
          {/*    {displayMode === DisplayMode.TIMELINE && <MenuItem value={"Local"}>Local</MenuItem>}*/}
          {/*    {timeZoneNames.map(tz => <MenuItem value={tz} key={tz}>{tz}</MenuItem>)}*/}
          {/*  </Select>*/}
          {/*</FormControl>*/}
        </Box>
        <Box>
          <ToggleButtonGroup
            value={displayMode}
            exclusive
            onChange={handleDisplayMode}
            aria-label="display mode"
          >
            <ToggleButton value={DisplayMode.TIMELINE} aria-label="timeline">
              <List/>
            </ToggleButton>
            <ToggleButton value={DisplayMode.CALENDAR} aria-label="calendar">
              <CalendarMonth/>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <DayTimeline/>
    </>
  )
}

export default Trip
