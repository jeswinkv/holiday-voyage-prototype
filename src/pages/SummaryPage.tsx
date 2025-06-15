
import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Smartphone, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/contexts/BookingContext";
import { useEffect, useState } from "react";

interface SelectedItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  details?: string;
}

interface BookingSummaryData {
  hotel: {
    name: string;
    nights: number;
    pricePerNight: number;
    total: number;
  } | null;
  hotelAncillaries: SelectedItem[];
  flight: {
    airline: string;
    route: string;
    passengers: number;
    pricePerPerson: number;
    total: number;
  } | null;
  flightAncillaries: SelectedItem[];
}

const SummaryPage = () => {
  const navigate = useNavigate();
  const { bookingState, getNumberOfNights } = useBooking();
  const [bookingSummary, setBookingSummary] = useState<BookingSummaryData>({
    hotel: null,
    hotelAncillaries: [],
    flight: null,
    flightAncillaries: []
  });

  useEffect(() => {
    console.log('Loading booking summary data...');
    console.log('LocalStorage keys:', Object.keys(localStorage));
    
    // Load booking summary from localStorage
    const savedHotel = localStorage.getItem('selectedHotel');
    const savedHotelAncillaries = localStorage.getItem('selectedHotelAncillaries');
    const savedFlight = localStorage.getItem('selectedFlight');
    const savedFlightAncillaries = localStorage.getItem('selectedFlightAncillaries');

    console.log('Raw data from localStorage:');
    console.log('Hotel:', savedHotel);
    console.log('Hotel ancillaries:', savedHotelAncillaries);
    console.log('Flight:', savedFlight);
    console.log('Flight ancillaries:', savedFlightAncillaries);

    const summary: BookingSummaryData = {
      hotel: null,
      hotelAncillaries: [],
      flight: null,
      flightAncillaries: []
    };

    // Parse hotel data
    if (savedHotel && savedHotel !== 'null') {
      try {
        const hotelData = JSON.parse(savedHotel);
        console.log('Parsed hotel data:', hotelData);
        const nights = getNumberOfNights();
        summary.hotel = {
          name: hotelData.name || "Selected Hotel",
          nights: nights,
          pricePerNight: hotelData.price || hotelData.pricePerNight || 0,
          total: (hotelData.price || hotelData.pricePerNight || 0) * nights
        };
      } catch (e) {
        console.error('Error parsing hotel data:', e);
      }
    }

    // Parse hotel ancillaries
    if (savedHotelAncillaries && savedHotelAncillaries !== 'null') {
      try {
        const ancillaries = JSON.parse(savedHotelAncillaries);
        console.log('Parsed hotel ancillaries:', ancillaries);
        if (typeof ancillaries === 'object' && ancillaries !== null) {
          summary.hotelAncillaries = Object.entries(ancillaries)
            .filter(([_, quantity]) => (quantity as number) > 0)
            .map(([name, quantity]) => {
              // Map ancillary names to prices
              const priceMap: { [key: string]: number } = {
                'Couples Spa Package': 180,
                'Sunset Dolphin Cruise': 85,
                'Island Hopping Adventure': 120,
                'Private Beach Dinner': 250,
                'Scuba Diving Experience': 95
              };
              const price = priceMap[name] || 0;
              return {
                name,
                quantity: quantity as number,
                price,
                total: price * (quantity as number)
              };
            });
        }
      } catch (e) {
        console.error('Error parsing hotel ancillaries:', e);
      }
    }

    // Parse flight data
    if (savedFlight && savedFlight !== 'null') {
      try {
        const flightData = JSON.parse(savedFlight);
        console.log('Parsed flight data:', flightData);
        const passengers = parseInt(bookingState.adults) + parseInt(bookingState.children) + parseInt(bookingState.infants);
        summary.flight = {
          airline: flightData.airline || flightData.name || "Selected Flight",
          route: `${bookingState.origin || 'Origin'} to ${bookingState.destination || 'Destination'}`,
          passengers: passengers,
          pricePerPerson: flightData.price || flightData.pricePerPerson || 0,
          total: (flightData.price || flightData.pricePerPerson || 0) * passengers
        };
      } catch (e) {
        console.error('Error parsing flight data:', e);
      }
    }

    // Parse flight ancillaries
    if (savedFlightAncillaries && savedFlightAncillaries !== 'null') {
      try {
        const ancillaries = JSON.parse(savedFlightAncillaries);
        console.log('Parsed flight ancillaries:', ancillaries);
        if (typeof ancillaries === 'object' && ancillaries !== null) {
          summary.flightAncillaries = Object.entries(ancillaries)
            .filter(([_, quantity]) => (quantity as number) > 0)
            .map(([name, quantity]) => {
              // Map ancillary names to prices
              const priceMap: { [key: string]: number } = {
                'Premium Meal Selection': 35,
                'In-Flight WiFi': 15,
                'Extra Legroom Seat': 85,
                'Premium Beverage Package': 45,
                'Priority Boarding': 25
              };
              const price = priceMap[name] || 0;
              return {
                name,
                quantity: quantity as number,
                price,
                total: price * (quantity as number)
              };
            });
        }
      } catch (e) {
        console.error('Error parsing flight ancillaries:', e);
      }
    }

    console.log('Final summary:', summary);
    setBookingSummary(summary);
  }, [bookingState, getNumberOfNights]);

  const handlePayment = () => {
    navigate('/confirmation');
  };

  const calculateSubtotal = () => {
    const hotelTotal = bookingSummary.hotel?.total || 0;
    const hotelAncillariesTotal = bookingSummary.hotelAncillaries.reduce((sum, item) => sum + item.total, 0);
    const flightTotal = bookingSummary.flight?.total || 0;
    const flightAncillariesTotal = bookingSummary.flightAncillaries.reduce((sum, item) => sum + item.total, 0);
    
    return hotelTotal + hotelAncillariesTotal + flightTotal + flightAncillariesTotal;
  };

  const subtotal = calculateSubtotal();
  const taxesAndFees = Math.round(subtotal * 0.15); // 15% taxes and fees
  const finalTotal = subtotal + taxesAndFees;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingBand />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Booking Summary
              </h1>
              <p className="text-gray-600">
                Review your holiday details before payment
              </p>
            </div>

            {/* Debug info - remove this in production */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
                <div className="text-sm space-y-1">
                  <div>Hotel selected: {bookingSummary.hotel ? 'Yes' : 'No'}</div>
                  <div>Hotel ancillaries: {bookingSummary.hotelAncillaries.length}</div>
                  <div>Flight selected: {bookingSummary.flight ? 'Yes' : 'No'}</div>
                  <div>Flight ancillaries: {bookingSummary.flightAncillaries.length}</div>
                  <div>Subtotal: £{subtotal}</div>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Summary */}
            {bookingSummary.hotel && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Hotel Accommodation</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">{bookingSummary.hotel.name}</TableCell>
                        <TableCell>
                          {bookingSummary.hotel.nights} night{bookingSummary.hotel.nights > 1 ? 's' : ''} × £{bookingSummary.hotel.pricePerNight}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          £{bookingSummary.hotel.total.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      {bookingSummary.hotelAncillaries.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>
                            {item.quantity} × £{item.price}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            £{item.total}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Flight Summary */}
            {bookingSummary.flight && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Flight Details</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">{bookingSummary.flight.airline}</TableCell>
                        <TableCell>
                          {bookingSummary.flight.route}<br />
                          {bookingSummary.flight.passengers} passenger{bookingSummary.flight.passengers > 1 ? 's' : ''} × £{bookingSummary.flight.pricePerPerson}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          £{bookingSummary.flight.total.toLocaleString()}
                        </TableCell>
                      </TableRow>
                      {bookingSummary.flightAncillaries.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>
                            {item.quantity} × £{item.price}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            £{item.total}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* No selections message */}
            {!bookingSummary.hotel && !bookingSummary.flight && (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600">No items selected yet. Please go back and make your selections.</p>
                  <Button 
                    onClick={() => navigate('/hotels')} 
                    className="mt-4 bg-ocean-600 hover:bg-ocean-700"
                  >
                    Start Booking
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Options</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-ocean-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-ocean-600" />
                      <div>
                        <div className="font-medium">Credit / Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-ocean-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-ocean-600" />
                      <div>
                        <div className="font-medium">Digital Wallet</div>
                        <div className="text-sm text-gray-600">Apple Pay, Google Pay</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-ocean-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-ocean-600" />
                      <div>
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-gray-600">Direct bank payment</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>£{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Taxes & Fees</span>
                    <span>£{taxesAndFees}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-ocean-700">£{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-ocean-600 hover:bg-ocean-700 text-white py-3 transition-all duration-300 transform hover:scale-105"
                  disabled={subtotal === 0}
                >
                  {subtotal === 0 ? 'No Items Selected' : 'Pay Now'}
                </Button>

                <p className="text-xs text-gray-600 text-center mt-4">
                  Your payment is secured with 256-bit SSL encryption
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
