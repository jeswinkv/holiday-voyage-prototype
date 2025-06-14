
import { Calendar, MapPin, Users } from "lucide-react";

interface BookingBandProps {
  origin?: string;
  destination?: string;
  outboundDate?: string;
  inboundDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  totalAmount?: string;
}

const BookingBand = ({
  origin = "London",
  destination = "Maldives",
  outboundDate = "15 Dec 2024",
  inboundDate = "22 Dec 2024",
  adults = 2,
  children = 1,
  infants = 0,
  totalAmount = "£2,450"
}: BookingBandProps) => {
  return (
    <div className="bg-white shadow-lg border-b sticky top-16 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-ocean-600" />
              <span className="font-medium">{origin}</span>
              <span className="text-gray-400">→</span>
              <span className="font-medium">{destination}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-ocean-600" />
              <span>{outboundDate} - {inboundDate}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-ocean-600" />
              <span>
                {adults} Adult{adults > 1 ? 's' : ''}
                {children > 0 && `, ${children} Child${children > 1 ? 'ren' : ''}`}
                {infants > 0 && `, ${infants} Infant${infants > 1 ? 's' : ''}`}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-xl font-bold text-ocean-700">{totalAmount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingBand;
