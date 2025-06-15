
import { useState } from "react";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { useBooking } from "@/contexts/BookingContext";

const majorCitiesWithCodes = [
  { city: "London", code: "LHR" },
  { city: "Manchester", code: "MAN" },
  { city: "Birmingham", code: "BHX" },
  { city: "Glasgow", code: "GLA" },
  { city: "Edinburgh", code: "EDI" },
  { city: "Liverpool", code: "LPL" },
  { city: "Leeds", code: "LBA" },
  { city: "Sheffield", code: "SHF" },
  { city: "Bristol", code: "BRS" },
  { city: "Newcastle", code: "NCL" },
  { city: "Belfast", code: "BFS" },
  { city: "Cardiff", code: "CWL" },
  { city: "Nottingham", code: "NQT" },
  { city: "Leicester", code: "LCR" },
  { city: "Coventry", code: "CVT" }
];

const majorDestinationsWithCodes = [
  { city: "Miami", code: "MIA" },
  { city: "Barcelona", code: "BCN" },
  { city: "Paris", code: "CDG" },
  { city: "Dubai", code: "DXB" },
  { city: "Maldives", code: "MLE" },
  { city: "Bali", code: "DPS" },
  { city: "Tokyo", code: "NRT" },
  { city: "New York", code: "JFK" },
  { city: "Rome", code: "FCO" },
  { city: "Santorini", code: "JTR" },
  { city: "Ibiza", code: "IBZ" },
  { city: "Cancun", code: "CUN" },
  { city: "Hawaii", code: "HNL" },
  { city: "Thailand", code: "BKK" },
  { city: "Morocco", code: "CMN" },
  { city: "Turkey", code: "IST" },
  { city: "Egypt", code: "CAI" },
  { city: "Greece", code: "ATH" }
];

const BookingForm = () => {
  const navigate = useNavigate();
  const { bookingState, updateBookingState } = useBooking();
  const [originSuggestions, setOriginSuggestions] = useState<typeof majorCitiesWithCodes>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<typeof majorDestinationsWithCodes>([]);

  const handleOriginChange = (value: string) => {
    updateBookingState({ origin: value });
    if (value.length > 0) {
      const filtered = majorCitiesWithCodes.filter(item => 
        item.city.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase())
      );
      setOriginSuggestions(filtered);
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleDestinationChange = (value: string) => {
    updateBookingState({ destination: value });
    if (value.length > 0) {
      const filtered = majorDestinationsWithCodes.filter(item => 
        item.city.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase())
      );
      setDestinationSuggestions(filtered);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleSearch = () => {
    navigate('/hotels');
  };

  const getTripLength = () => {
    if (bookingState.dateRange?.from && bookingState.dateRange?.to) {
      const days = differenceInDays(bookingState.dateRange.to, bookingState.dateRange.from);
      return days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';
    }
    return '';
  };

  const getDateRangeText = () => {
    if (bookingState.dateRange?.from && bookingState.dateRange?.to) {
      return `${format(bookingState.dateRange.from, "MMM dd")} - ${format(bookingState.dateRange.to, "MMM dd, yyyy")}`;
    } else if (bookingState.dateRange?.from) {
      return `${format(bookingState.dateRange.from, "MMM dd, yyyy")} - Select return date`;
    }
    return "Select travel dates";
  };

  return (
    <div className="container mx-auto px-4 -mt-16 relative z-10">
      <Card className="max-w-6xl mx-auto glass-effect shadow-2xl">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Origin */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Origin city"
                  value={bookingState.origin}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className="pl-10"
                />
                {originSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                    {originSuggestions.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          updateBookingState({ origin: `${item.city} (${item.code})` });
                          setOriginSuggestions([]);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        {item.city} ({item.code})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Destination city"
                  value={bookingState.destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  className="pl-10"
                />
                {destinationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                    {destinationSuggestions.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => {
                          updateBookingState({ destination: `${item.city} (${item.code})` });
                          setDestinationSuggestions([]);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        {item.city} ({item.code})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date Range Picker - spans 2 columns */}
            <div className="space-y-2 lg:col-span-2">
              <label className="text-sm font-medium text-gray-700">Travel Dates</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !bookingState.dateRange?.from && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="flex-1">{getDateRangeText()}</span>
                    {getTripLength() && (
                      <span className="ml-2 px-2 py-1 bg-ocean-100 text-ocean-700 text-xs font-medium rounded">
                        {getTripLength()}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="range"
                    selected={bookingState.dateRange}
                    onSelect={(dateRange) => updateBookingState({ dateRange })}
                    numberOfMonths={2}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Adults */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Adults</label>
              <Select value={bookingState.adults} onValueChange={(value) => updateBookingState({ adults: value })}>
                <SelectTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Children */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Children</label>
              <Select value={bookingState.children} onValueChange={(value) => updateBookingState({ children: value })}>
                <SelectTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2,3,4].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Infants */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Infants</label>
              <Select value={bookingState.infants} onValueChange={(value) => updateBookingState({ infants: value })}>
                <SelectTrigger>
                  <Users className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[0,1,2].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                className="w-full bg-ocean-600 hover:bg-ocean-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
              >
                <Search className="mr-2 h-4 w-4" />
                Search Holidays
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
