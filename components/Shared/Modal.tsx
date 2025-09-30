export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50">
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}