
import React from 'react';

interface MapProps {
  className?: string;
}

const Map = ({ className }: MapProps) => {
  // Google Maps embed URL for Kathmandu Post office location
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5911.127204155396!2d81.51655538001373!3d28.244439430011802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39987ded7ebac2d5%3A0xda18d581f78bfe45!2sTharu%20Cultural%20centre!5e0!3m2!1sen!2snp!4v1751571355750!5m2!1sen!2snp";

  return (
    <div className={`relative ${className}`}>
      <iframe
        src={googleMapsEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg"
        title="The Kathmandu Post Office Location"
      ></iframe>
    </div>
  );
};

export default Map;