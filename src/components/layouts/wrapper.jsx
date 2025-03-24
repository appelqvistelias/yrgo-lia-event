export default function Wrapper({ children, padding }) {
    return (
      <div className='wrapper' style={{ padding }}>
        {children}
      </div>
    );
  }