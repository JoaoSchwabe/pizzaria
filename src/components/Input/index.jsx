import React from "react";

const Input = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            className="flex-1 w-full my-2 appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default Input;
