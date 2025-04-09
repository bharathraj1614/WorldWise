function FlagEmoji({ countryCode }) {
  // var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
  // .map((char) => String.fromCharCode(char - 127397).toLowerCase())
  // .join("");

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={countryCodeToEmoji(countryCode)}
    />
  );
}

export default FlagEmoji;

function countryCodeToEmoji(countryCode) {
  if (!/^[a-zA-Z]{2}$/.test(countryCode)) return "❓";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
