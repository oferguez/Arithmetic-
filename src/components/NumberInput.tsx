import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-medium text-purple-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        min={min}
        max={max}
        className="w-24 px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none"
      />
    </div>
  );
};
