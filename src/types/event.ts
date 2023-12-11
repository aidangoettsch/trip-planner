import {Location} from "./location";
import {Property} from "csstype";
import Color = Property.Color;

/**
 * Type of event within a trip.
 */
export enum EventType {
  Connection,
  Attraction,
}

/**
 * Mode of transit used for a {@link Connection}.
 */
export enum ConnectionType {
  Drive = "Drive",
  Flight = "Flight",
  Train = "Train",
  Bus = "Bus",
  Transit = "Transit",
}

/**
 * Base event type with metadata shared across all subtypes.
 */
interface EventBase {
  // TODO: properly handle ids for keys
  id: string,
  startTime: Date,
  endTime: Date,
}

/**
 * Metadata associated with an individual vehicle trip, such as route or flight numbers and carrier logos.
 */
export interface CarrierMetadata {
  /**
   * An identifier of the vehicle trip provided by the carrier, such as a flight number with carrier prefix ("UA 123")
   * or route for transit ("Ride On 76" or "Red Line"). This may be augmented by {@link carrierImage} to replace a
   * carrier name in lines such as "Ride On 76".
   */
  legCode?: string,
  /**
   * An image which replaces or augments the leg code, such as line bullets for the NYC Subway or DC Metro.
   */
  legCodeImage?: string,
  /**
   * Color associated with a line used as a background, such as in "LIRR [Babylon Branch]".
   */
  legCodeColor?: Color,
  /**
   * An image which represents the carrier, particularly on intercity connections, such as an airline logo, or the logo
   * of a carrier name in transit connections such as "Ride On 76".
   */
  carrierImage?: string,
}

/**
 * An extension of carrier metadata which includes start and end times for different vehicle trips which make up a
 * single connection, such as a connection that involves a transfer between two buses where the transfer point is not
 * relevant to the overall connection and the optimal routing will depend on the exact start time. For example, a bus
 * journey where the user experience should be to have some idea of the route, but the exact route should be presented
 * by an external navigation app depending on real time conditions. This would likely not apply to a flight or intercity
 * train connection, where each leg must be traveled as ticketed.
 */
export type LegMetadata =  CarrierMetadata & {
  startTime: Date,
  endTime: Date,
}

/**
 * Event representing planned travel between two points. Includes both longer events such as flights as well as
 * shorter events such as walking between attractions.
 */
export type Connection = EventBase & {
  type: EventType.Connection,
  connectionType: ConnectionType,
  startLocation: Location,
  endLocation: Location,
  /**
   * Metadata associated with each vehicle trip of a connection. Some connections may have none associated, such as
   * driving, while other connections may have multiple legs that form an overall connection (see {@link LegMetadata}.
   */
  legMeta?: CarrierMetadata | LegMetadata[],
}

/**
 * Event representing a visit to a location for an extended period of time, specifically when the event will end at
 * the same place that it begins.
 */
export type Attraction = EventBase & {
  type: EventType.Attraction,
  location: Location,
}

/**
 * Event within a trip.
 */
export type TripEvent = Connection | Attraction

/**
 * @param event An event.
 * @returns If an event is a {@link Connection}.
 */
export function isConnection(event: TripEvent): event is Connection {
  return event.type === EventType.Connection
}

/**
 * @param event An event.
 * @returns If an event is an {@link Attraction}.
 */
export function isAttraction(event: TripEvent): event is Attraction {
  return event.type === EventType.Attraction
}
