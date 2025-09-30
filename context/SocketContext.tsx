"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Inicializa el socket con configuración robusta
    const socketInstance = io({
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      transports: ["websocket", "polling"], // Fallback a polling
    });

    // Eventos de conexión
    socketInstance.on("connect", () => {
      console.log("✅ Socket conectado:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("❌ Socket desconectado:", reason);
      setIsConnected(false);

      // Si es desconexión del servidor, intenta reconectar
      if (reason === "io server disconnect") {
        socketInstance.connect();
      }
    });

    socketInstance.on("connect_error", (error) => {
      console.error("🔴 Error de conexión:", error.message);
      setIsConnected(false);
    });

    socketInstance.on("reconnect", (attemptNumber) => {
      console.log(`🔄 Reconectado después de ${attemptNumber} intentos`);
    });

    socketInstance.on("reconnect_attempt", (attemptNumber) => {
      console.log(`🔄 Intento de reconexión #${attemptNumber}`);
    });

    socketInstance.on("reconnect_error", (error) => {
      console.error("🔴 Error al reconectar:", error.message);
    });

    socketInstance.on("reconnect_failed", () => {
      console.error("🔴 Falló la reconexión después de todos los intentos");
    });

    setSocket(socketInstance);

    // Cleanup
    return () => {
      console.log("🧹 Limpiando socket...");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext debe usarse dentro de SocketProvider");
  }
  return context;
}
