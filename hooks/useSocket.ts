'use client'
import { useSocketContext } from "@/context/SocketContext";
import { useCallback } from "react";

type EventCallback = (...args: any[]) => void;

export function useSocket() {
  const { socket, isConnected } = useSocketContext();

  // Añade soporte para callback de confirmación (ACK)
  const emit = useCallback(
    (event: string, data?: any, callback?: Function) => {
      if (!socket) {
        console.warn(`Socket no disponible. Evento: ${event}`);
        return;
      }

      if (callback) {
        socket.emit(event, data, callback);
      } else {
        socket.emit(event, data);
      }
    },
    [socket]
  );

  const on = useCallback(
    (event: string, callback: EventCallback) => {
      if (!socket) {
        console.warn(`Socket no disponible para listener: ${event}`);
        return () => {};
      }

      socket.on(event, callback);

      return () => {
        socket.off(event, callback);
      };
    },
    [socket]
  );

  return { socket, on, emit, isConnected };
}
