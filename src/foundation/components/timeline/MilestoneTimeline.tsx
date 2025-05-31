import { Globe, Heart, Target } from "lucide-react";
import { useState } from "react";

interface MilestoneTimelineProps {
  milestones: {
    year: string;
    title: string;
    description: string;
  }[];
  title: string;
  icon?: React.ReactNode;
}
// 4. Milestone Timeline - Các mốc quan trọng
const MilestoneTimeline = ({
  milestones,
  title,
  icon,
}: MilestoneTimelineProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="p-4 md:p-6 lg:p-8 border shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl md:rounded-2xl border-primary/20">
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 lg:mb-8">
        {icon || (
          <Target className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-primary" />
        )}
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-text-primary">
          {title}
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-0.75 lg:w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-0.5 opacity-30 rounded-full"></div>

        {milestones.map((milestone, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className="relative flex items-center w-full mb-6 md:mb-8 lg:mb-12 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute z-20 transform -translate-x-1/2 left-1/2 top-4 md:top-5 lg:top-6">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 text-xs md:text-sm lg:text-base font-bold transition-all duration-300 border-2 md:border-3 lg:border-4 rounded-full shadow-lg text-text-on-primary bg-gradient-to-r from-primary to-secondary group-hover:scale-110 border-background-elevated">
                  {milestone.year}
                </div>
              </div>

              <div className="flex w-full">
                {!isEven && (
                  <div className="flex justify-end w-1/2 pr-4 md:pr-6 lg:pr-8">
                    <div
                      className={`max-w-[200px] md:max-w-[250px] lg:max-w-sm p-3 md:p-4 lg:p-6 bg-background-elevated rounded-xl shadow-lg border border-border-subtle transition-all duration-500 ease-in-out transform group-hover:shadow-xl group-hover:scale-105 ${hoveredIndex === index ? "translate-x-2 shadow-2xl" : "translate-x-0"} relative`}
                    >
                      <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                        <div className="flex-shrink-0 p-1 md:p-1.5 lg:p-2 rounded-full bg-primary/10">
                          <Heart className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 md:mb-2 lg:mb-3 text-sm md:text-base lg:text-lg font-semibold text-primary">
                            {milestone.title}
                          </div>
                          <p className="text-xs md:text-sm lg:text-base leading-relaxed text-text-secondary">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      <div className="absolute right-0 w-0 h-0 transform translate-x-2 border-t-4 md:border-t-6 lg:border-t-8 border-b-4 md:border-b-6 lg:border-b-8 border-l-4 md:border-l-6 lg:border-l-8 top-4 md:top-6 lg:top-8 border-l-background-elevated border-t-transparent border-b-transparent"></div>
                    </div>
                  </div>
                )}

                {isEven && (
                  <>
                    <div className="w-1/2"></div>
                    <div className="w-1/2 pl-4 md:pl-6 lg:pl-8">
                      <div
                        className={`max-w-[200px] md:max-w-[250px] lg:max-w-sm p-3 md:p-4 lg:p-6 bg-background-elevated rounded-xl shadow-lg border border-border-subtle transition-all duration-500 ease-in-out transform group-hover:shadow-xl group-hover:scale-105 ${hoveredIndex === index ? "-translate-x-2 shadow-2xl" : "translate-x-0"} relative`}
                      >
                        <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
                          <div className="flex-shrink-0 p-1 md:p-1.5 lg:p-2 rounded-full bg-secondary/10">
                            <Globe className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 md:mb-2 lg:mb-3 text-sm md:text-base lg:text-lg font-semibold text-secondary">
                              {milestone.title}
                            </div>
                            <p className="text-xs md:text-sm lg:text-base leading-relaxed text-text-secondary">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                        <div className="absolute left-0 w-0 h-0 transform -translate-x-2 border-t-4 md:border-t-6 lg:border-t-8 border-b-4 md:border-b-6 lg:border-b-8 border-r-4 md:border-r-6 lg:border-r-8 top-4 md:top-6 lg:top-8 border-r-background-elevated border-t-transparent border-b-transparent"></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MilestoneTimeline;
