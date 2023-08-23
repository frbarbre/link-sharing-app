interface Props {
  name: string;
  value: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

export default function Input({
  name,
  value,
  placeholder,
  handleChange,
  title,
}: Props) {
  return (
    <div className="flex justify-between md:items-center flex-col md:flex-row">
      <p className="text-medium-gray md:text-[16px] text-[12px] leading-[18px] pb-[4px] md:leading-[24px]">
        {title}
      </p>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="hover:shadow-purple-shadow transition-shadow w-full md:max-w-[432px] h-[48px] p-[12px] rounded-[8px] outline-none border border-light-gray hover:border-primary-purple"
      />
    </div>
  );
}
