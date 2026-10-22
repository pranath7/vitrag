import React from "react";

interface ProductArtworkProps {
  category: string;
  name: string;
  className?: string;
  hasGold?: boolean;
}

export function ProductArtwork({
  category,
  name,
  className = "w-full h-full",
  hasGold = false,
}: ProductArtworkProps) {
  const cat = category.toLowerCase();
  const isDinnerSet = cat.includes("dinner") || name.toLowerCase().includes("dinner");
  const isPlatter = cat.includes("platter") || cat.includes("serving") || name.toLowerCase().includes("platter") || name.toLowerCase().includes("board");
  const isDryFruit = cat.includes("dry") || cat.includes("fruit") || name.toLowerCase().includes("box") || name.toLowerCase().includes("caddy");
  const isMug = cat.includes("mug") || cat.includes("cup") || cat.includes("chai") || cat.includes("kullad");
  const isKitchen = cat.includes("kitchen") || name.toLowerCase().includes("spice") || name.toLowerCase().includes("masala") || name.toLowerCase().includes("jar");
  const isGift = cat.includes("gift") || cat.includes("hamper") || name.toLowerCase().includes("set");

  // Editorial SVG visual tailored per tableware category
  if (isDinnerSet) {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="200" height="200" fill="#F7F4EE" />
        {/* Outer Dinner Plate */}
        <circle cx="100" cy="100" r="76" fill="#FFFFFF" stroke="#E7E0D6" strokeWidth="2" />
        <circle cx="100" cy="100" r="72" stroke={hasGold ? "#D4AF37" : "#5A252E"} strokeWidth={hasGold ? "1.5" : "0.75"} strokeDasharray={hasGold ? "none" : "2 2"} />
        {/* Middle Quarter Plate */}
        <circle cx="100" cy="100" r="50" fill="#FDFBF7" stroke="#E7E0D6" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="47" stroke={hasGold ? "#D4AF37" : "#8B8176"} strokeWidth="0.75" />
        {/* Inner Katori Bowl */}
        <circle cx="100" cy="100" r="28" fill="#F7F4EE" stroke="#E7E0D6" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="26" stroke={hasGold ? "#D4AF37" : "#5A252E"} strokeWidth="1" />
        <text x="100" y="104" textAnchor="middle" fill="#5A252E" fontSize="7" fontFamily="Georgia, serif" letterSpacing="2">
          VITRAG
        </text>
      </svg>
    );
  }

  if (isPlatter) {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="200" height="200" fill="#F7F4EE" />
        {/* Oval Serving Platter */}
        <ellipse cx="100" cy="100" rx="84" ry="52" fill="#FFFFFF" stroke="#E7E0D6" strokeWidth="2" />
        <ellipse cx="100" cy="100" rx="78" ry="46" stroke={hasGold ? "#D4AF37" : "#5A252E"} strokeWidth="1" strokeDasharray="4 2" />
        <ellipse cx="100" cy="100" rx="55" ry="32" fill="#FBF9F5" stroke="#E7E0D6" strokeWidth="1" />
        <text x="100" y="103" textAnchor="middle" fill="#5A252E" fontSize="7" fontFamily="Georgia, serif" letterSpacing="2">
          SERVEWARE
        </text>
      </svg>
    );
  }

  if (isDryFruit) {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="200" height="200" fill="#F7F4EE" />
        {/* 4-Compartment Box */}
        <rect x="35" y="35" width="130" height="130" rx="6" fill="#FFFFFF" stroke="#E7E0D6" strokeWidth="2" />
        <rect x="40" y="40" width="120" height="120" rx="4" stroke={hasGold ? "#D4AF37" : "#5A252E"} strokeWidth="1.5" />
        {/* 4 Quadrants */}
        <line x1="100" y1="40" x2="100" y2="160" stroke="#D9D0C1" strokeWidth="1.5" />
        <line x1="40" y1="100" x2="160" y2="100" stroke="#D9D0C1" strokeWidth="1.5" />
        {/* Compartment Wells */}
        <circle cx="70" cy="70" r="18" fill="#F7F4EE" stroke="#E7E0D6" />
        <circle cx="130" cy="70" r="18" fill="#F7F4EE" stroke="#E7E0D6" />
        <circle cx="70" cy="130" r="18" fill="#F7F4EE" stroke="#E7E0D6" />
        <circle cx="130" cy="130" r="18" fill="#F7F4EE" stroke="#E7E0D6" />
        <circle cx="100" cy="100" r="10" fill="#5A252E" />
        <text x="100" y="103" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontFamily="sans-serif">
          V
        </text>
      </svg>
    );
  }

  if (isMug) {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="200" height="200" fill="#F7F4EE" />
        {/* Saucer */}
        <ellipse cx="95" cy="150" rx="65" ry="16" fill="#FFFFFF" stroke="#E7E0D6" strokeWidth="2" />
        <ellipse cx="95" cy="150" rx="55" ry="12" stroke={hasGold ? "#D4AF37" : "#5A252E"} strokeWidth="1" />
        {/* Mug Body */}
        <path d="M60 70 L65 140 Q95 146 125 140 L130 70 Z" fill="#FFFFFF" stroke="#E7E0D6" strokeWidth="2" />
        {/* Mug Rim */}
        <ellipse cx="95" cy="70" rx="35" ry="10" fill="#F7F4EE" stroke={hasGold ? "#D4AF37" : "#5A252E"} strokeWidth="1.5" />
        {/* Handle */}
        <path d="M130 85 C155 85 155 125 127 128" stroke="#E7E0D6" strokeWidth="6" strokeLinecap="round" />
        <path d="M130 85 C155 85 155 125 127 128" stroke="#5A252E" strokeWidth="2" strokeLinecap="round" />
        <text x="95" y="112" textAnchor="middle" fill="#8B8176" fontSize="7" fontFamily="Georgia, serif" letterSpacing="1">
          TEAWARE
        </text>
      </svg>
    );
  }

  if (isKitchen) {
    return (
      <svg
        viewBox="0 0 200 200"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="200" height="200" fill="#F7F4EE" />
        {/* Round Spice Danni */}
        <circle cx="100" cy="100" r="72" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="100" cy="100" r="66" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
        {/* 7 internal spice cups */}
        <circle cx="100" cy="100" r="16" fill="#F7F4EE" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="100" cy="62" r="15" fill="#F7F4EE" stroke="#D4AF37" />
        <circle cx="133" cy="80" r="15" fill="#F7F4EE" stroke="#D4AF37" />
        <circle cx="133" cy="120" r="15" fill="#F7F4EE" stroke="#D4AF37" />
        <circle cx="100" cy="138" r="15" fill="#F7F4EE" stroke="#D4AF37" />
        <circle cx="67" cy="120" r="15" fill="#F7F4EE" stroke="#D4AF37" />
        <circle cx="67" cy="80" r="15" fill="#F7F4EE" stroke="#D4AF37" />
        <text x="100" y="103" textAnchor="middle" fill="#5A252E" fontSize="6" fontFamily="sans-serif">
          BRASS
        </text>
      </svg>
    );
  }

  // Default Gift Box / Tableware Ensemble
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="200" height="200" fill="#F7F4EE" />
      <rect x="45" y="55" width="110" height="90" rx="4" fill="#FFFFFF" stroke="#E7E0D6" strokeWidth="2" />
      <rect x="40" y="45" width="120" height="20" rx="2" fill="#FDFBF7" stroke="#D9D0C1" strokeWidth="1.5" />
      {/* Ribbon */}
      <line x1="100" y1="45" x2="100" y2="145" stroke="#5A252E" strokeWidth="8" />
      <line x1="45" y1="95" x2="155" y2="95" stroke="#5A252E" strokeWidth="8" />
      {/* Bow */}
      <circle cx="100" cy="45" r="9" fill="#5A252E" />
      <text x="100" y="125" textAnchor="middle" fill="#8B8176" fontSize="7" fontFamily="Georgia, serif" letterSpacing="1">
        GIFT SET
      </text>
    </svg>
  );
}
