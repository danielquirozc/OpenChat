import { SendHorizontal } from "lucide-react";

export default function SendMessageForm({
  sendMessage,
}: {
  sendMessage: ({ content }: { content: string }) => void;
}) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const message = formData.get("message") as string;

    sendMessage({ content: message });
    (event.target as HTMLFormElement).reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-stretch m-5 gap-2 justify-center w-5/6"
    >
      <label className="flex border overflow-hidden border-gray-400 rounded-xl h-full w-full">
        <p className="text-gray-700 border-r text-sm border-gray-400 p-2">
          Mensaje
        </p>
        <input type="text" name="message" className="px-2 text-sm w-full" />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white text-sm font-bold px-2 rounded-xl hover:bg-blue-600"
      >
        <SendHorizontal strokeWidth={1.5} size={20} className="inline-block" />
      </button>
    </form>
  );
}
