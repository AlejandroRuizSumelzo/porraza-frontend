import Flag from "react-flagpack";
import "react-flagpack/dist/style.css";

/**
 * Component that renders a country flag using react-flagpack
 * Supports all ISO codes including GB subdivisions (GB-ENG, GB-WLS, GB-SCT, GB-NIR)
 */
interface CountryFlagProps {
  countryCode: string;
  countryName?: string;
  className?: string;
}

export function CountryFlag({
  countryCode,
  countryName,
  className = "",
}: CountryFlagProps) {
  return (
    <div className={className} title={countryName || countryCode}>
      <Flag
        code={countryCode}
        gradient="real-linear"
        size="L"
        hasBorder={false}
        hasBorderRadius={true}
        hasDropShadow={false}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
