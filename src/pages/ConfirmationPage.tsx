
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, MapPin, Plane, Building, Mail, Phone } from "lucide-react";

const ConfirmationPage = () => {
  const bookingReference = "JV" + Math.random().toString(36).substr(2, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for choosing JV Holidays. Your payment was successful and your booking is confirmed.
            </p>
            <div className="bg-ocean-50 border border-ocean-200 rounded-lg p-6 inline-block">
              <div className="text-sm text-ocean-700 mb-1">Booking Reference</div>
              <div className="text-3xl font-bold text-ocean-800">{bookingReference}</div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Trip Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-ocean-600" />
                  Trip Summary
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Destination</div>
                    <div className="font-medium">London → Maldives</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Travel Dates</div>
                    <div className="font-medium">15 Dec 2024 - 22 Dec 2024</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Passengers</div>
                    <div className="font-medium">2 Adults, 1 Child</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                    <div className="font-medium text-ocean-700">£6,065</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-ocean-600" />
                  Hotel Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Hotel</div>
                    <div className="font-medium">Ocean View Resort & Spa</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Check-in</div>
                    <div className="font-medium">15 Dec 2024, 3:00 PM</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Check-out</div>
                    <div className="font-medium">22 Dec 2024, 11:00 AM</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Nights</div>
                    <div className="font-medium">7 nights</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flight Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Plane className="w-5 h-5 text-ocean-600" />
                  Flight Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Outbound</div>
                    <div className="font-medium">QR 651 - 15 Dec, 08:15 LHR → 21:30 MLE</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Return</div>
                    <div className="font-medium">QR 652 - 22 Dec, 23:50 MLE → 06:30+1 LHR</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Airline</div>
                    <div className="font-medium">Qatar Airways</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-ocean-600" />
                  Need Help?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">24/7 Support</div>
                      <div className="font-medium">+44 20 1234 5678</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-600">Email Support</div>
                      <div className="font-medium">support@jvholidays.com</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Information */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Information</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• A confirmation email with your e-tickets and vouchers has been sent to your registered email address.</p>
                <p>• Please ensure all passengers have valid passports with at least 6 months validity from the travel date.</p>
                <p>• Check-in online 24 hours before your flight departure for the best seat selection.</p>
                <p>• Hotel confirmation and any special requests will be communicated directly by the hotel.</p>
                <p>• Keep your booking reference handy for any future correspondence.</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center space-x-4">
            <Button
              variant="outline"
              className="px-8 py-3"
              onClick={() => window.print()}
            >
              Print Confirmation
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-3 transition-all duration-300 transform hover:scale-105"
            >
              Book Another Holiday
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
