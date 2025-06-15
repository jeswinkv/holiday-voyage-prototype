
import { Calendar, MapPin, Users } from "lucide-react";
import { useBooking } from "@/contexts/BookingContext";
import { format } from "date-fns";

interface BookingBandProps {
  totalAmount?: string;
  showTotal?: boolean;
}

const BookingBand = ({
  totalAmount = "£2,450",
  showTotal = true
}: BookingBandProps) => {
  const { bookingState } = useBooking();

  const getFormattedDates = () => {
    if (bookingState.dateRange?.from && bookingState.dateRange?.to) {
      const outbound = format(bookingState.dateRange.from, "dd MMM yyyy");
      const inbound = format(bookingState.dateRange.to, "dd MMM yyyy");
      return { outbound, inbound };
    }
    return { outbound: "15 Dec 2024", inbound: "22 Dec 2024" };
  };

  const { outbound, inbound } = getFormattedDates();

  const getPassengerCount = () => {
    const adults = parseInt(bookingState.adults);
    const children = parseInt(bookingState.children);
    const infants = parseInt(bookingState.infants);

    const parts = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
    if (children > 0) parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
    if (infants > 0) parts.push(`${infants} Infant${infants > 1 ? 's' : ''}`);

    return parts.join(', ');
  };

  // Extract city names from the selected values (remove airport codes)
  const getDisplayName = (value: string) => {
    if (!value) return '';
    // If it contains parentheses, extract just the city name
    const match = value.match(/^(.+?)\s*\(/);
    return match ? match[1] : value;
  };

  const displayOrigin = getDisplayName(bookingState.origin) || "London";
  const displayDestination = getDisplayName(bookingState.destination) || "Maldives";

  return (
    <div className="bg-white shadow-lg border-b sticky top-16 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ocean-600" />
              <span className="font-medium">{displayOrigin}</span>
              <span className="text-gray-400">→</span>
              <span className="font-medium">{displayDestination}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-ocean-600" />
              <span>{outbound} - {inbound}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-ocean-600" />
              <span>{getPassengerCount()}</span>
            </div>
          </div>
          
          {showTotal && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-xl font-bold text-ocean-700">{totalAmount}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingBand;
