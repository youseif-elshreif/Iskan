import React from "react";
import {Card} from "@/components/ui/index";

interface ListingMapProps {
  mapEmbedUrl: string;
}

const ListingMap: React.FC<ListingMapProps> = ({ mapEmbedUrl }) => {
  return (
    <Card>
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--color-primary)" }}
      >
        الموقع
      </h2>
      <div className="w-full h-64 rounded-lg overflow-hidden">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="موقع السكن"
        />
      </div>
    </Card>
  );
};

export default ListingMap;
