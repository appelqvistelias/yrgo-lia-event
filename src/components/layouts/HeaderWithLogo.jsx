export default function HeaderWithLogo({
  children,
  padding,
  margin,
  fontSize,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding,
        margin,
        fontSize,
      }}
    >
      <h1>{children}</h1>
      <img src="src/icons/yrgo-logo-mobile.svg" alt="logo" />
    </div>
  );
}
