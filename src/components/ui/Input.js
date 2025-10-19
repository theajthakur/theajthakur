export default function Input({
  className = "",
  type = "text",
  placeholder = "Type here",
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-3 rounded-md border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
    />
  );
}
