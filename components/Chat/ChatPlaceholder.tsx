import { Lock, Zap } from "lucide-react";
import Image from "next/image";

export default function ChatPlaceholder() {
  return (
    <div className="w-full p-5 flex flex-col items-center justify-center relative">
      <div
        className="absolute inset-0 -z-10 opacity-45 bg-repeat bg-size-[50px]"
        style={{
          backgroundImage: "url('/bg_pattern.svg')",
        }}
      ></div>
      <div className="flex flex-2 flex-col items-center justify-end">
        <Image src="/openchat.svg" alt="logo" width={100} height={100} />
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-extrabold">OpenChat</h2>
          <span className="text-yellow-600 absolute left-full -top-2.5 mx-1 text-nowrap font-medium p-1 rounded text-xs bg-yellow-200">
            Alpha Version
          </span>
        </div>
        <p className="text-gray-500 mt-2 w-full md:w-2/3 text-center">
          Chatea con tranquilidad, Conversaciones privadas, seguras y solo entre
          tú y tus amigos.
        </p>
      </div>
      <div className="inline-flex flex-col md:flex-row flex-1 items-center gap-5 mt-5 text-gray-600">
        <div className="place-content-center border border-gray-300 rounded-xl p-5 w-72 text-center bg-linear-to-t from-gray-200 to-white">
          <Lock
            size={40}
            strokeWidth={2.5}
            className="mx-auto text-blue-400 mb-2"
          />
          <p>Privacidad con cifrado de extremo a extremo</p>
        </div>
        <div className="place-content-center border border-gray-300 rounded-xl p-5 w-72 text-center bg-linear-to-t from-gray-200 to-white">
          <Zap
            size={40}
            strokeWidth={2.5}
            className="mx-auto text-yellow-400 mb-2"
          />
          <p>Desarrollado con un enfoque en el rendimiento y la rapidez</p>
        </div>
      </div>
      <div className="flex items-end justify-center flex-1">
        <span className="text-gray-400 text-sm mt-10 text-center">
          Un proyecto de código abierto creado para quienes valoran la
          comunicación rápida y sencilla.
        </span>
      </div>
    </div>
  );
}
