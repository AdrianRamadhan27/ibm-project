import ToggleSwitch from "./toggleSwitch";
export default function MetrikSlider({ label, valueKey, state, setState }: {
  label: string,
  valueKey: 'fun' | 'productivity' | 'stress',
  state: any,
  setState: any
}) {
  const enabled = state[valueKey].enabled
  const value = state[valueKey].value

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span>{label}</span>
        <ToggleSwitch
        enabled={enabled}
        onToggle={() =>
            setState((prev: any) => ({
            ...prev,
            [valueKey]: { ...prev[valueKey], enabled: !prev[valueKey].enabled }
            }))
        }
        />

      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        disabled={!enabled}
        onChange={(e) =>
          setState((prev: any) => ({
            ...prev,
            [valueKey]: { ...prev[valueKey], value: parseInt(e.target.value) }
          }))
        }
        className="w-full disabled:opacity-40"
      />
      <p className="text-sm text-gray-600 mt-1">{value}%</p>
    </div>
  );
}
