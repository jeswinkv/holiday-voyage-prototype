
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

const majorCities = [
  "London", "Manchester", "Birmingham", "Glasgow", "Edinburgh", "Liverpool", "Leeds", "Sheffield", 
  "Bristol", "Newcastle", "Belfast", "Cardiff", "Nottingham", "Leicester", "Coventry"
];

const majorDestinations = [
  "Miami", "Barcelona", "Paris", "Dubai", "Maldives", "Bali", "Tokyo", "New York", "Rome", 
  "Santorini", "Ibiza", "Cancun", "Hawaii", "Thailand", "Morocco", "Turkey", "Egypt", "Greece"
];

const BookingForm = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);

  const handleOriginChange = (value: string) => {
    setOrigin(value);
    if (value.length > 0) {
      const filtered = majorCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setOriginSuggestions(filtered);
    } else {
      setOriginSuggestions([]);
    }
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    if (value.length > 0) {
      const filtered = majorDestinations.filter(destination => 
        destination.toLowerCase().includes(value.toLowerCase())
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
    if (dateRange?.from && dateRange?.to) {
      const days = differenceInDays(dateRange.to, dateRange.from);
      return days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '';
    }
    return '';
  };

  const getDateRangeText = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
    } else if (dateRange?.from) {
      return `${format(dateRange.from, "MMM dd, yyyy")} - Select return date`;
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
                  value={origin}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className="pl-10"
                />
                {originSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                    {originSuggestions.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setOrigin(city);
                          setOriginSuggestions([]);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        {city}
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
                  value={destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  className="pl-10"
                />
                {destinationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg z-20 max-h-40 overflow-y-auto">
                    {destinationSuggestions.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setDestination(city);
                          setDestinationSuggestions([]);
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        {city}
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
                      !dateRange?.from && "text-muted-foreground"
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
                    selected={dateRange}
                    onSelect={setDateRange}
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
              <Select value={adults} onValueChange={setAdults}>
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
              <Select value={children} onValueChange={setChildren}>
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
              <Select value={infants} onValueChange={setInfants}>
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
