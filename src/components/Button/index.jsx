import React from "react";

const Button = ({ Text, onClick, Type = "button" }) => {
    return (
        <button
            className="my-2 flex w-full justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            type={Type}
            onClick={onClick}
        >
            {Text}
        </button>
    );
};

export default Button;
