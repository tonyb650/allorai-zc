import { FlightResponseData } from './response-data';

export interface FlightSegment {
  duration: string;
  departure: {
    airport: string;
    time: string;
  };
  arrival: {
    airport: string;
    time: string;
  };
  airline: string;
}

export interface FlightLeg {
  direction: 'outbound' | 'return';
  legDuration: string;
  segments: FlightSegment[];
}

export interface AirportInfo {
  name: string;
  iata_code: string;
  latitude_deg: number;
  longitude_deg: number;
}

export interface CityInfo {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Flight {
  id: string;
  price: string;
  currency: string;
  legs: FlightLeg[];
  destinationAirport: AirportInfo;
  destinationCity?: CityInfo;
}

export const SAMPLE_FLIGHT_OPTIONS: Flight[] = [
  {
    id: '1',
    price: '429',
    currency: 'USD',
    legs: [
      {
        direction: 'outbound',
        legDuration: '5h 52m',
        segments: [
          {
            duration: '5h 52m',
            departure: { airport: 'SFO', time: '2026-03-12T08:10:00' },
            arrival: { airport: 'FLL', time: '2026-03-12T16:02:00' },
            airline: 'Pacific Crest Air',
          },
        ],
      },
      {
        direction: 'return',
        legDuration: '6h 03m',
        segments: [
          {
            duration: '6h 03m',
            departure: { airport: 'FLL', time: '2026-03-20T10:20:00' },
            arrival: { airport: 'SFO', time: '2026-03-20T14:23:00' },
            airline: 'Pacific Crest Air',
          },
        ],
      },
    ],
    destinationAirport: {
      name: 'Fort Lauderdale-Hollywood International Airport',
      iata_code: 'FLL',
      latitude_deg: 26.0726,
      longitude_deg: -80.1527,
    },
    destinationCity: {
      name: 'Fort Lauderdale',
      latitude: 26.1224,
      longitude: -80.1373,
    },
  },
  {
    id: '2',
    price: '361',
    currency: 'USD',
    legs: [
      {
        direction: 'outbound',
        legDuration: '8h 04m',
        segments: [
          {
            duration: '3h 31m',
            departure: { airport: 'SFO', time: '2026-03-12T06:20:00' },
            arrival: { airport: 'DFW', time: '2026-03-12T11:51:00' },
            airline: 'Sunland Airways',
          },
          {
            duration: '2h 53m',
            departure: { airport: 'DFW', time: '2026-03-12T13:05:00' },
            arrival: { airport: 'FLL', time: '2026-03-12T16:58:00' },
            airline: 'Sunland Airways',
          },
        ],
      },
      {
        direction: 'return',
        legDuration: '8h 22m',
        segments: [
          {
            duration: '3h 09m',
            departure: { airport: 'FLL', time: '2026-03-20T07:10:00' },
            arrival: { airport: 'ATL', time: '2026-03-20T10:19:00' },
            airline: 'Copper Wing',
          },
          {
            duration: '5h 13m',
            departure: { airport: 'ATL', time: '2026-03-20T12:05:00' },
            arrival: { airport: 'SFO', time: '2026-03-20T15:18:00' },
            airline: 'Copper Wing',
          },
        ],
      },
    ],
    destinationAirport: {
      name: 'Fort Lauderdale-Hollywood International Airport',
      iata_code: 'FLL',
      latitude_deg: 26.0726,
      longitude_deg: -80.1527,
    },
    destinationCity: {
      name: 'Fort Lauderdale',
      latitude: 26.1224,
      longitude: -80.1373,
    },
  },
  {
    id: '3',
    price: '512',
    currency: 'USD',
    legs: [
      {
        direction: 'outbound',
        legDuration: '8h 57m',
        segments: [
          {
            duration: '4h 36m',
            departure: { airport: 'SFO', time: '2026-03-12T11:30:00' },
            arrival: { airport: 'MIA', time: '2026-03-12T19:06:00' },
            airline: 'Crimson Pacific',
          },
          {
            duration: '0h 44m',
            departure: { airport: 'MIA', time: '2026-03-12T20:05:00' },
            arrival: { airport: 'FLL', time: '2026-03-12T20:49:00' },
            airline: 'Crimson Pacific',
          },
        ],
      },
      {
        direction: 'return',
        legDuration: '8h 34m',
        segments: [
          {
            duration: '1h 02m',
            departure: { airport: 'FLL', time: '2026-03-20T12:25:00' },
            arrival: { airport: 'CLT', time: '2026-03-20T13:27:00' },
            airline: 'Crimson Pacific',
          },
          {
            duration: '5h 32m',
            departure: { airport: 'CLT', time: '2026-03-20T15:00:00' },
            arrival: { airport: 'SFO', time: '2026-03-20T17:32:00' },
            airline: 'Crimson Pacific',
          },
        ],
      },
    ],
    destinationAirport: {
      name: 'Fort Lauderdale-Hollywood International Airport',
      iata_code: 'FLL',
      latitude_deg: 26.0726,
      longitude_deg: -80.1527,
    },
    destinationCity: {
      name: 'Fort Lauderdale',
      latitude: 26.1224,
      longitude: -80.1373,
    },
  },
];

export const SAMPLE_FLIGHTS_RESPONSE: FlightResponseData = {
  type: 'flight',
  summary: 'Sample round-trip flights from SFO to FLL for Mar 12–20, 2026.',
  options: SAMPLE_FLIGHT_OPTIONS,
};
