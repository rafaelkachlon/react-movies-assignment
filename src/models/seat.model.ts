export default interface Seat {
  seat: string;
  status: 'Available' | 'Sold' | 'Pending';
  price: number;
}
