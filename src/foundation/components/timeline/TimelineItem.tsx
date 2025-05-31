import { GraduationCap } from "lucide-react";

interface TimelineItemProps {
  year: string;
  content: string;
  index: number;
  isHovered: number | null;
  onHover: (index: number) => void;
  onLeave: () => void;
}

const TimelineItem = ({
  year,
  content,
  index,
  isHovered,
  onHover,
  onLeave,
}: TimelineItemProps) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className="relative flex items-start w-full mb-6 md:mb-8 lg:mb-12 group"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Timeline line connector */}
      {index > 0 && (
        <div className="absolute left-1/2 top-0 w-0.5 h-8 bg-gradient-to-b from-secondary to-secondary-light transform -translate-x-0.5"></div>
      )}

      {/* Year marker */}
      <div className="absolute z-20 transform -translate-x-1/2 left-1/2 top-8">
        <div className="flex items-center justify-center w-8 h-8 text-xs font-bold transition-all duration-300 border-2 rounded-full shadow-lg md:w-12 md:h-12 lg:w-16 lg:h-16 md:text-sm lg:text-base md:border-3 lg:border-4 text-text-on-secondary bg-gradient-to-r from-secondary to-secondary-light group-hover:scale-110 border-background-elevated">
          {year}
        </div>
      </div>

      {/* Content container */}
      <div className="flex w-full">
        {/* Left side content (for odd indexes) */}
        {!isEven && (
          <div className="flex justify-end w-1/2 pr-4 md:pr-6 lg:pr-8">
            <div
              className={`
                max-w-[200px] md:max-w-[250px] lg:max-w-sm p-3 md:p-4 lg:p-6 bg-background-elevated rounded-xl shadow-lg border border-border-subtle
                transition-all duration-500 ease-in-out transform
                group-hover:shadow-xl group-hover:scale-105
                ${
                  isHovered === index
                    ? "translate-x-2 shadow-2xl"
                    : "translate-x-0"
                }
                relative
              `}
            >
              <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                <div className="flex-shrink-0 p-1 md:p-1.5 lg:p-2 rounded-full bg-secondary-light/10">
                  <GraduationCap className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="mb-1 text-sm font-semibold md:mb-2 lg:mb-3 md:text-base lg:text-lg text-secondary">
                    {year}
                  </div>
                  <p className="text-xs leading-relaxed md:text-sm lg:text-base text-text-secondary">
                    {content}
                  </p>
                </div>
              </div>

              {/* Arrow pointing to timeline */}
              <div className="absolute right-0 w-0 h-0 transform translate-x-2 border-t-4 border-b-4 border-l-4 md:border-t-6 lg:border-t-8 md:border-b-6 lg:border-b-8 md:border-l-6 lg:border-l-8 top-4 md:top-6 lg:top-8 border-l-background-elevated border-t-transparent border-b-transparent"></div>
            </div>
          </div>
        )}

        {/* Right side content (for even indexes) */}
        {isEven && (
          <>
            <div className="w-1/2"></div>
            <div className="w-1/2 pl-4 md:pl-6 lg:pl-8">
              <div
                className={`
                  max-w-[200px] md:max-w-[250px] lg:max-w-sm p-3 md:p-4 lg:p-6 bg-background-elevated rounded-xl shadow-lg border border-border-subtle
                  transition-all duration-500 ease-in-out transform
                  group-hover:shadow-xl group-hover:scale-105
                  ${
                    isHovered === index
                      ? "-translate-x-2 shadow-2xl"
                      : "translate-x-0"
                  }
                  relative
                `}
              >
                <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                  <div className="flex-shrink-0 p-1 md:p-1.5 lg:p-2 rounded-full bg-secondary-light/10">
                    <GraduationCap className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 text-sm font-semibold md:mb-2 lg:mb-3 md:text-base lg:text-lg text-secondary">
                      {year}
                    </div>
                    <p className="text-xs leading-relaxed md:text-sm lg:text-base text-text-secondary">
                      {content}
                    </p>
                  </div>
                </div>

                {/* Arrow pointing to timeline */}
                <div className="absolute left-0 w-0 h-0 transform -translate-x-2 border-t-4 border-b-4 border-r-4 md:border-t-6 lg:border-t-8 md:border-b-6 lg:border-b-8 md:border-r-6 lg:border-r-8 top-4 md:top-6 lg:top-8 border-r-background-elevated border-t-transparent border-b-transparent"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;
