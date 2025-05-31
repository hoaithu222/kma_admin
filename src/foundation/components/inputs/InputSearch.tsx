import clsx from "clsx";

interface InputSearchProps {
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  value: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const InputSearch = ({
  placeholder,
  name,
  onChange,
  icon,
  value,
  className,
  size = "md",
}: InputSearchProps) => {
  const sizeClasses = {
    sm: {
      input: "py-1 px-3 text-sm",
      iconContainer: "text-sm",
      pl: icon ? "pl-6" : "",
    },
    md: {
      input: "py-1 px-3 text-sm md:py-2 md:px-4 text-base",
      iconContainer: "text-base",
      pl: icon ? "pl-4 sm:pl-6 md:pl-8" : "",
    },
    lg: {
      input: "py-2 px-4 text-base md:py-3 md:px-6 text-lg",
      iconContainer: "text-lg",
      pl: icon ? "pl-6 sm:pl-8 md:pl-10" : "",
    },
  };

  const selectedSize = sizeClasses[size];

  return (
    <div className={clsx("relative", className)}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full border border-border-strong p-[1px]">
          <div className="w-full h-full rounded-full" />
        </div>

        {/* Input */}
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            "relative rounded-full w-full",
            selectedSize.input,
            selectedSize.pl,
            "focus:ring-2 focus:outline-none",
            "transition-all duration-200 ease-in-out",
            "border border-info-light",
            "bg-background-muted",
            "text-info-light",
            "focus:ring-info-light"
          )}
        />
      </div>

      {/* Icon nếu có */}
      {icon && (
        <div
          className={clsx(
            "absolute -translate-y-1/2 top-1/2 pointer-events-none",
            size === "sm" ? "left-1.5" : size === "md" ? "left-2" : "left-3",
            selectedSize.iconContainer,
            "text-info-light"
          )}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default InputSearch;
