export interface SearchResultsInterface extends BusServicesInterface {
}

export interface BusServicesInterface {
  id: string;
  departureLocation: string;
  arrivalLocation: string;
  date: string;
  availableSeats: AvailableSeatsInterface[];
  price: number;
  busTrip: string;
  departureTime: string;
  arrivalTime: string;
  travelTime: string;
}

export interface AvailableSeatsInterface {
  seatNumber: number,
  gender: string
}