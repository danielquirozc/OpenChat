import MobileHeader from "@/components/MobileHeader";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ChatProvider } from "@/context/ChatContext";
import { SocketProvider } from "@/context/SocketContext";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-dvh font-sans">
      <SocketProvider>
        <ChatProvider>
          <MobileHeader />
          <div className="flex w-full flex-1">
            <Sidebar />
            {children}
          </div>
        </ChatProvider>
      </SocketProvider>
    </section>
  );
}
