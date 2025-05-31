import { useState } from "react";
import { GraduationCap, BookOpen } from "lucide-react";

interface AcademicTimelineProps {
  data: {
    semester?: string;
    year?: string;
    course: string;
    description: string;
    credits?: string;
    grade?: string;
  }[];
  title: string;
  icon?: React.ReactNode;
}

// 1. Academic Timeline - Quá trình học tập
const AcademicTimeline = ({ data, title, icon }: AcademicTimelineProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="p-4 border shadow-lg md:p-6 lg:p-8 bg-background-elevated rounded-xl md:rounded-2xl border-border-subtle">
      <div className="flex items-center gap-2 mb-4 md:gap-3 md:mb-6 lg:mb-8">
        {icon || (
          <GraduationCap className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-secondary" />
        )}
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl text-text-primary">
          {title}
        </h2>
      </div>

      <div className="relative">
        <div className="absolute left-4 md:left-6 lg:left-8 top-0 bottom-0 w-0.5 md:w-0.75 lg:w-1 bg-gradient-to-b from-secondary to-secondary-light opacity-30"></div>

        {data.map((item, index: number) => (
          <div
            key={index}
            className="relative flex items-start gap-3 pb-4 md:gap-4 lg:gap-6 md:pb-6 lg:pb-8 group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative z-10 flex items-center justify-center w-10 h-10 text-xs font-bold transition-transform duration-300 rounded-full shadow-lg md:w-12 md:h-12 lg:w-16 lg:h-16 md:text-sm lg:text-base bg-gradient-to-r from-secondary to-secondary-light text-text-on-secondary group-hover:scale-110">
              {item.semester || item.year}
            </div>

            <div
              className={`flex-1 bg-background-elevated rounded-xl p-3 md:p-4 lg:p-6 shadow-md border border-border-subtle transition-all duration-300 ${hoveredIndex === index ? "shadow-xl scale-105" : ""}`}
            >
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                <h3 className="text-base font-semibold md:text-lg text-text-primary">
                  {item.course}
                </h3>
              </div>
              <p className="mb-2 text-xs md:mb-3 md:text-sm text-text-secondary">
                {item.description}
              </p>
              {item.credits && (
                <div className="flex items-center gap-2 text-xs md:gap-4 text-text-secondary">
                  <span className="px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {item.credits}
                  </span>
                  {item.grade && (
                    <span className="px-2 py-1 rounded-full bg-success/10 text-success">
                      {item.grade}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicTimeline;
