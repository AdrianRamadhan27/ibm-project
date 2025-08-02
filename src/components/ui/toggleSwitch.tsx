// components/ToggleSwitch.tsx
import React from "react";

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  label?: string;
}

export default function ToggleSwitch({ enabled, onToggle, label }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-3 ">
      {label && <span className="text-sm">{label}</span>}
      <button
        onClick={onToggle}
        className={`hover:cursor-pointer relative inline-flex items-center h-6 w-12 rounded-full transition-colors duration-300 ${
          enabled ? "bg-green-500" : "bg-red-500"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
