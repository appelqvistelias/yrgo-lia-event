export default function Wrapper({ children, padding, gap }) {
    return (
      <div className='wrapper' style={{ display: "flex", flexDirection: "column", padding, gap }}>
        {children}
      </div>
    );
  }