export default function Wrapper({
  children,
  padding,
  gap,
  alignItems = "flex-start",
}) {
  return (
    <>
      <div
        className="wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          padding,
          gap,
          alignItems,
        }}
      >
        {children}
      </div>
    </>
  );
}
