import React from "react";

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  icon,
  endAdornment,
  error,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`block text-black w-full ${
            icon ? "pl-10" : "pl-4"
          } pr-10 py-3 sm:text-sm border ${
            error
              ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-green-500 focus:border-green-500"
          } rounded-md transition duration-150 ease-in-out ${
            endAdornment ? "pr-10" : ""
          }`}
          placeholder={placeholder}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {endAdornment}
          </div>
        )}
      </div>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;
