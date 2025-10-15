import React from 'react';

const Merca2Logo = () => (
    <svg width="140" height="40" viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="30" fontFamily="Arial, sans-serif" fontSize="30" fill="#A0A0A0" fontWeight="bold">
        merca
        <tspan fill="#C0C0C0">2</tspan>
      </text>
    </svg>
  );
  
  const ClinicaDentalRobLogo = () => (
    <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30H10Z" stroke="#A0A0A0" strokeWidth="2"/>
      <text x="35" y="18" fontFamily="Arial, sans-serif" fontSize="12" fill="#A0A0A0" fontWeight="bold">CLÍNICA</text>
      <text x="35" y="32" fontFamily="Arial, sans-serif" fontSize="16" fill="#A0A0A0" fontWeight="bold">DENTAL rob</text>
    </svg>
  );
  
  const DraEdurnePalaciosLogo = () => (
    <svg width="150" height="60" viewBox="0 0 150 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.7">
        <path d="M25 5C13.9543 5 5 13.9543 5 25C5 36.0457 13.9543 45 25 45C36.0457 45 45 36.0457 45 25C45 13.9543 36.0457 5 25 5Z" fill="#A0A0A0"/>
        <path d="M22 25C22 23.3431 23.3431 22 25 22C26.6569 22 28 23.3431 28 25C28 26.6569 26.6569 28 25 28C23.3431 28 22 26.6569 22 25Z" fill="white"/>
        <path d="M15 30C15 26 18 20 25 20C32 20 35 26 35 30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 18L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M32 18L35 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      <text x="55" y="15" fontFamily="Arial, sans-serif" fontSize="8" fill="#A0A0A0">DRA. EDURNE</text>
      <text x="55" y="28" fontFamily="Arial, sans-serif" fontSize="8" fill="#A0A0A0">PALACIOS</text>
      <text x="55" y="41" fontFamily="Arial, sans-serif" fontSize="8" fill="#A0A0A0">CIRUGÍA</text>
      <text x="55" y="54" fontFamily="Arial, sans-serif" fontSize="8" fill="#A0A0A0">MAXILOFACIAL</text>
    </svg>
  );
  
  const AtelierDentalLogo = () => (
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="50" height="50" stroke="#A0A0A0" strokeWidth="1"/>
      <g>
        <path d="M15 15L25 25L15 35" stroke="#A0A0A0" strokeWidth="1"/>
        <path d="M25 15L35 25L25 35" stroke="#A0A0A0" strokeWidth="1"/>
        <path d="M35 15L45 25L35 35" stroke="#A0A0A0" strokeWidth="1"/>
      </g>
      <text x="65" y="30" fontFamily="Arial, sans-serif" fontSize="10" fill="#A0A0A0">ATELIER DENTAL</text>
      <text x="65" y="45" fontFamily="Arial, sans-serif" fontSize="7" fill="#A0A0A0">ODONTOLOGÍA DE AUTOR</text>
    </svg>
  );
  
  const ToothLogo = () => (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10C10 10 10 25 20 25L30 15L40 25L50 15L60 25C70 25 70 10 60 10C50 10 50 20 40 20C30 20 30 10 20 10Z" stroke="#A0A0A0" strokeWidth="2" fill="none"/>
      <path d="M20 25C20 40 30 50 40 50C50 50 60 40 60 25" stroke="#A0A0A0" strokeWidth="2" fill="none"/>
      <circle cx="40" cy="35" r="5" fill="#A0A0A0" opacity="0.5"/>
    </svg>
  );
  
  const AscensiumLogo = () => (
    <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="30" fontFamily="Arial, sans-serif" fontSize="24" fill="#A0A_A0A0" fontWeight="bold">Ascensium.</text>
      <path d="M80 10L85 20L82 15L80 10Z" fill="#A0A0A0"/>
      <path d="M82 15L90 5" stroke="#A0A0A0" strokeWidth="1.5"/>
    </svg>
  );

  const OdontoCentryLogo = () => (
    <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5C15 2.23858 17.2386 0 20 0H30C32.7614 0 35 2.23858 35 5V35C35 37.7614 32.7614 40 30 40H20C17.2386 40 15 37.7614 15 35V5Z" fill="#A0A0A0" opacity="0.6"/>
      <circle cx="25" cy="12" r="3" fill="white"/>
      <text x="45" y="28" fontFamily="Arial, sans-serif" fontSize="18" fill="#A0A0A0" fontWeight="bold">Odonto Centry</text>
    </svg>
  );
  

const logos = [
  <Merca2Logo key="merca2" />,
  <ClinicaDentalRobLogo key="dentalrob" />,
  <DraEdurnePalaciosLogo key="edurne" />,
  <AtelierDentalLogo key="atelier" />,
  <ToothLogo key="tooth" />,
  <AscensiumLogo key="ascensium" />,
  <OdontoCentryLogo key="odontocentry" />,
];

export const LogoCloud: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-white w-full overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-8">
          Clínicas que hemos ayudado a crecer
        </h2>
        <div
          className="relative flex gap-12 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div className="flex shrink-0 animate-scroll items-center gap-12">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0" style={{ minWidth: '150px' }}>
                {logo}
              </div>
            ))}
          </div>
          <div className="absolute top-0 flex shrink-0 animate-scroll-alternate items-center gap-12">
             {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0" style={{ minWidth: '150px' }}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
