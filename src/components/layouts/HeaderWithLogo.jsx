import YrgoLogo from "@/icons/yrgologo.svg";

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
      <YrgoLogo />
    </div>
  );
}
