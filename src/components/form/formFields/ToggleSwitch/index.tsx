import { Controller } from "react-hook-form";
import Label from "../../formInputs/Label";

interface ToggleSwitchProps {
    name: string;
    control: any;
    label?: string;
    disabled?: boolean;
    error?: string;
    className?: string;
}

// Toggle Switch Component
const ToggleSwitch = ({
    name,
    control,
    label,
    disabled = false,
    error,
    className = "",
}: ToggleSwitchProps) => {
    return (
        <div className={`flex flex-coll gap-2 ${className}`}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <button
                        type="button"
                        role="switch"
                        aria-checked={value}
                        disabled={disabled}
                        onClick={() => onChange(!value)}
                        className={`
              relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-400
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              ${value ? "bg-yellow-400" : "bg-gray-600"}
            `}
                    >
                        <span
                            className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out
                ${value ? "translate-x-6" : "translate-x-1"}
              `}
                        />
                    </button>
                )}
            />

            {label && <Label label={label} name={name} />}

            {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
};

export default ToggleSwitch;
