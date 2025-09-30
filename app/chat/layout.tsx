import Sidebar from "@/components/Sidebar/Sidebar";
import { ChatProvider } from "@/context/ChatContext";
import { SocketProvider } from "@/context/SocketContext";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full font-sans">
      <SocketProvider>
        <ChatProvider>
          <Sidebar />
          {children}
        </ChatProvider>
      </SocketProvider>
    </section>
  );
}
