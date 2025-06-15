
import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Smartphone, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "@/contexts/BookingContext";

const SummaryPage = () => {
  const navigate = useNavigate();
  const { bookingState, getNumberOfNights } = useBooking();

  const handlePayment = () => {
    navigate('/confirmation');
  };

  // Sample data - in a real app, this would come from the booking context
  // For now, using placeholder data that matches typical selections
  const selectedItems = {
    hotel: {
      name: "Ocean View Resort & Spa",
      nights: getNumberOfNights(),
      pricePerNight: 450,
      total: 450 * getNumberOfNights()
    },
    hotelAncillaries: [
      { name: "Couples Spa Package", quantity: 1, price: 180, total: 180 },
      { name: "Sunset Dolphin Cruise", quantity: 2, price: 85, total: 170 }
    ],
    flight: {
      airline: "IBS Airways",
      route: `${bookingState.origin || 'London'} to ${bookingState.destination || 'Maldives'}`,
      passengers: parseInt(bookingState.adults) + parseInt(bookingState.children) + parseInt(bookingState.infants),
      pricePerPerson: 780,
      total: 780 * (parseInt(bookingState.adults) + parseInt(bookingState.children) + parseInt(bookingState.infants))
    },
    flightAncillaries: [
      { name: "Extra Legroom Seat", quantity: 2, price: 85, total: 170 },
      { name: "Premium Meal Selection", quantity: 3, price: 35, total: 105 }
    ]
  };

  const calculateSubtotal = () => {
    return selectedItems.hotel.total + 
           selectedItems.hotelAncillaries.reduce((sum, item) => sum + item.total, 0) +
           selectedItems.flight.total +
           selectedItems.flightAncillaries.reduce((sum, item) => sum + item.total, 0);
  };

  const subtotal = calculateSubtotal();
  const taxesAndFees = 185;
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

            {/* Hotel Summary */}
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
                      <TableCell className="font-medium">{selectedItems.hotel.name}</TableCell>
                      <TableCell>
                        {selectedItems.hotel.nights} night{selectedItems.hotel.nights > 1 ? 's' : ''} × £{selectedItems.hotel.pricePerNight}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        £{selectedItems.hotel.total.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    {selectedItems.hotelAncillaries.map((item, index) => (
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

            {/* Flight Summary */}
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
                      <TableCell className="font-medium">{selectedItems.flight.airline}</TableCell>
                      <TableCell>
                        {selectedItems.flight.route}<br />
                        {selectedItems.flight.passengers} passenger{selectedItems.flight.passengers > 1 ? 's' : ''} × £{selectedItems.flight.pricePerPerson}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        £{selectedItems.flight.total.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    {selectedItems.flightAncillaries.map((item, index) => (
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
                >
                  Pay Now
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
