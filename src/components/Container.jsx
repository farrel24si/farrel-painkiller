export default function Container({ children, className = "" }) {
  return (
    <div className={`container mx-auto py-8 px-6 font-['Helvetica'] ${className}`}>
      {children}
    </div>
  );
}