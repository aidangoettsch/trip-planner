/**
 * Location represented using coordinates and associated metadata.
 */
import {ConnectionType} from "./event";

export interface LocationBase {
  /**
   * Name describing the location.
   */
  name: string,
  /**
   * Latitude of this location.
   */
  lat: number,
  /**
   * Longitude of this location.
   */
  long: number,
  // TODO: Add Google Maps identifying data
}

/**
 * Extension of a {@link Location} that includes additional metadata for locations which serve as intercity
 * transport hubs, such as airports and intercity rail stations. These locations are not generally destinations and
 * may not be primarily associated with the actual city they are located in, but rather a larger metro area.
 */
export type IntercityPort = LocationBase & {
  /**
   * Mode served by this port.
   */
  portMode: ConnectionType,
  /**
   * Name of the metropolitan area (with possible disambiguating suffix) served by this port.
   *
   * For example, KIAD in Dulles, VA, is represented "Washington Dulles", while KDTW in Romulus, MI is
   * represented as "Detroit, MI".
   */
  metroName: string,
  /**
   * Code identifying the port, for example LGA for LaGuardia Airport or NYP for Penn Station.
   */
  code?: string,
}

/**
 * Type encompassing all types of location.
 */
export type Location = LocationBase | IntercityPort

/**
 * @param location A location.
 * @returns If location is an {@link IntercityPort}
 */
export function isIntercityPort(location: Location): location is IntercityPort {
  return "metroName" in location
}
