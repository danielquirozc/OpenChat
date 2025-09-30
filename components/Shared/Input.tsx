interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  value,
  onChange,
  ...props
}: InputProps) {
  return (
    <label className="flex border mt-5 overflow-hidden border-gray-300 rounded-xl">
      <p className="text-gray-700 border-r text-sm border-gray-300 p-2">
        {label}
      </p>
      <input
        className="px-2 text-sm w-full"
        value={value}
        onChange={onChange}
        {...props}
      />
    </label>
  );
}
