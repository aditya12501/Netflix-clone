import React from "react";
interface inputProps {
  id: any;
  onChange: any;
  value: string;
  lable: string;
  type?: string;
}

const Input: React.FC<inputProps> = ({ id, onChange, value, lable, type }) => {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        onChange={onChange}
        value={value}
        className="
                        block appearance-none
                        px-6 pt-6 pb-1 rounded-md
                        text-white text-md
                        w-full bg-neutral-700
                        focus:outline-none
                        focus:ring-0
                        peer
                        "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
        absolute text-md text-zinc-400
        duration-150 transform -translate-y-3
        scale-75 top-4 z-10 origin-[0] left-6
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
        "
      >
        {lable}
      </label>
    </div>
  );
};

export default Input;
