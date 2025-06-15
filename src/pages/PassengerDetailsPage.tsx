import Header from "@/components/Header";
import BookingBand from "@/components/BookingBand";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PassengerDetailsPage = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([
    { id: 1, type: 'Adult', details: {} },
    { id: 2, type: 'Adult', details: {} },
    { id: 3, type: 'Child', details: {} }
  ]);

  const handleInputChange = (passengerId: number, field: string, value: string) => {
    setPassengers(prev => prev.map(passenger => 
      passenger.id === passengerId 
        ? { ...passenger, details: { ...passenger.details, [field]: value } }
        : passenger
    ));
  };

  const handleContinue = () => {
    navigate('/summary');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BookingBand />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Passenger Details
          </h1>
          <p className="text-gray-600">
            Please provide details for all passengers
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {passengers.map((passenger, index) => (
            <Card key={passenger.id}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Passenger {index + 1} ({passenger.type})
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <Select onValueChange={(value) => handleInputChange(passenger.id, 'title', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mr">Mr</SelectItem>
                        <SelectItem value="mrs">Mrs</SelectItem>
                        <SelectItem value="miss">Miss</SelectItem>
                        <SelectItem value="ms">Ms</SelectItem>
                        <SelectItem value="dr">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name *</label>
                    <Input
                      placeholder="First name"
                      onChange={(e) => handleInputChange(passenger.id, 'firstName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Middle Name</label>
                    <Input
                      placeholder="Middle name (optional)"
                      onChange={(e) => handleInputChange(passenger.id, 'middleName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name *</label>
                    <Input
                      placeholder="Last name"
                      onChange={(e) => handleInputChange(passenger.id, 'lastName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Date of Birth *</label>
                    <Input
                      type="date"
                      onChange={(e) => handleInputChange(passenger.id, 'dateOfBirth', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Passport Number *</label>
                    <Input
                      placeholder="Passport number"
                      onChange={(e) => handleInputChange(passenger.id, 'passportNumber', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Passport Expiry *</label>
                    <Input
                      type="date"
                      onChange={(e) => handleInputChange(passenger.id, 'passportExpiry', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      onChange={(e) => handleInputChange(passenger.id, 'email', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                    <Input
                      type="tel"
                      placeholder="+44 20 1234 5678"
                      onChange={(e) => handleInputChange(passenger.id, 'phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium text-gray-700">Address *</label>
                  <Input
                    placeholder="Full address"
                    onChange={(e) => handleInputChange(passenger.id, 'address', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Frequent Flyer Number</label>
                  <Input
                    placeholder="Loyalty program number (optional)"
                    onChange={(e) => handleInputChange(passenger.id, 'loyaltyNumber', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleContinue}
            className="bg-ocean-600 hover:bg-ocean-700 text-white px-8 py-3 transition-all duration-300 transform hover:scale-105"
          >
            Continue to Summary
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetailsPage;
