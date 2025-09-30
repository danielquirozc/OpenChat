'use client'
import { getUsersPublicData } from "@/app/actions/user/getUsersPublicData";
import { UserPublicData } from "@/types/UserPublicData";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import PopUpContacts from "./PopUpContacts";

export default function Filters() {
  const [contacts, setContacts] = useState<UserPublicData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await getUsersPublicData();
        if (!res) return;
        setContacts(res);
      } catch {
        console.error("Error fetching contacts");
      }
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="mt-5 space-y-4">
      <label
        htmlFor=""
        className="flex relative items-center gap-2 bg-gray-200 border border-gray-300 rounded-xl p-2 text-sm w-full"
      >
        <SearchIcon size={16} className="text-stone-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=""
          placeholder="Buscar contactos"
        />
        {searchTerm && <PopUpContacts contacts={filteredContacts} />}
      </label>
    </div>
  );
}
