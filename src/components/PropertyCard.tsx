import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, DollarSign, Home, TrendingUp, Eye } from "lucide-react";

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  price: number;
  monthlyRent: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: "single-family" | "condo" | "apartment" | "townhome";
  status: "available" | "occupied" | "maintenance";
  imageUrl: string;
  yield: number;
  lastUpdated: string;
}

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (propertyId: string) => void;
  onEdit?: (propertyId: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onEdit,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "occupied":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("us", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case "single-family":
        return "Single Family";
      case "condo":
        return "Condo";
      case "apartment":
        return "Apartment";
      case "townhome":
        return "Townhome";
      default:
        return type;
    }
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
      {/* Property Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={property.imageUrl}
          alt={`${property.address} property image`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className={`${getStatusColor(property.status)} font-medium`}>
            {property.status.toUpperCase()}
          </Badge>
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {getPropertyTypeLabel(property.propertyType)}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/70 rounded-full px-3 py-1">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <span className="text-white text-sm font-medium">
            {property.yield.toFixed(1)}% yield
          </span>
        </div>
      </div>

      {/* Property Details */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {property.address}
            </h3>
            <p className="text-sm text-gray-600">
              {property.city}, {property.state}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(property.price)}
            </p>
            <p className="text-sm text-green-600 font-medium">
              {formatPrice(property.monthlyRent)}/mo.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Property Features */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 font-medium">
                {property.bedrooms} bed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-ww h-4 text-gray-500" />
              <span className="text-gray-600 font-medium">
                {property.bathrooms} bath
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600 font-medium">
                {property.squareFeet.toLocaleString()} sqft
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onViewDetails?.(property.id)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => onEdit?.(property.id)}
            >
              Edit Property
            </Button>
          </div>

          <div className="text-xs text-gray-500 pt-2">
            Last updated: {new Date(property.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;