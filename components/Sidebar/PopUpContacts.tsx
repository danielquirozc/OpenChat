import { ArrowRight, UserIcon } from "lucide-react";
import { UserPublicData } from "@/types/UserPublicData";
import { useChatContext } from "@/context/ChatContext";
import Image from "next/image";

type PopUpContactsProps = {
  contacts?: UserPublicData[];
}

export default function PopUpContacts({ contacts }: PopUpContactsProps) {
  const { openChatByContact } = useChatContext()
  return (
    <div className="absolute overflow-hidden left-0 mt-2 rounded-xl bg-white border border-gray-300 top-full w-full">
      <div>
        {contacts?.map((contact) => (
          <div
            onClick={() => openChatByContact(contact.id)}
            key={contact.id}
            className="flex group items-center p-2 hover:bg-gray-100 cursor-pointer w-full"
          >
            {contact.avatar ? (
              <Image
                src={contact.avatar}
                alt={contact.username}
                className="w-8 h-8 rounded-full inline-block mr-2"
              />
            ) : (
              <UserIcon className="w-8 h-8 bg-gray-200 p-1 rounded-full text-gray-500 inline-block mr-2" />
            )}
            <span className="flex-grow text-gray-700">
              {contact.username}
            </span>
            <ArrowRight className="inline-block text-right text-gray-300 group-hover:text-gray-500 duration-300" />
          </div>
        ))}
        {contacts?.length === 0 && (
          <div className="p-2 text-gray-500">
            No se encontró ningún contacto.
          </div>
        )}
      </div>
    </div>
  );
}
