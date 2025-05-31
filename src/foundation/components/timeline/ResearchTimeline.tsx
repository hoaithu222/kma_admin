import { useState } from "react";
import { BookOpen, ChevronDown, ChevronRight, Lightbulb } from "lucide-react";

interface ResearchTimelineProps {
  projects: {
    title: string;
    period: string | React.ReactNode;
    description: string | React.ReactNode;
    technologies?: string[];
    status?: "completed" | "ongoing" | "planned";
  }[];
  title: string;
  icon?: React.ReactNode;
}
// 5. Research Timeline - Các dự án nghiên cứu
const ResearchTimeline = ({ projects, title, icon }: ResearchTimelineProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="p-4 border shadow-lg md:p-6 lg:p-8 bg-background-elevated rounded-xl md:rounded-2xl border-border-subtle">
      <div className="flex items-center gap-2 mb-4 md:gap-3 md:mb-6 lg:mb-8">
        {icon || (
          <Lightbulb className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-accent" />
        )}
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl text-text-primary">
          {title}
        </h2>
      </div>

      <div className="space-y-2 md:space-y-3 lg:space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="overflow-hidden border border-border-subtle rounded-xl"
          >
            <div
              className="p-3 transition-colors duration-200 cursor-pointer md:p-4 lg:p-6 hover:bg-background-muted"
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                  <div className="p-1 md:p-1.5 lg:p-2 rounded-full bg-accent/10">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold md:text-lg text-text-primary">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-text-secondary">
                      {project.period}
                    </p>
                  </div>
                </div>
                {expandedIndex === index ? (
                  <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-text-secondary" />
                ) : (
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-text-secondary" />
                )}
              </div>
            </div>

            {expandedIndex === index && (
              <div className="px-3 pb-3 border-t md:px-4 lg:px-6 md:pb-4 lg:pb-6 border-border-subtle">
                <div className="pt-2 space-y-2 md:pt-3 lg:pt-4 md:space-y-3 lg:space-y-4">
                  <p className="text-xs md:text-sm text-text-secondary">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {project.technologies?.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full md:px-3 md:text-sm bg-accent/10 text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.status && (
                    <div className="flex items-center gap-1 md:gap-2">
                      <div
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                          project.status === "completed"
                            ? "bg-success"
                            : project.status === "ongoing"
                              ? "bg-warning"
                              : "bg-error"
                        }`}
                      ></div>
                      <span className="text-xs capitalize md:text-sm text-text-secondary">
                        {project.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default ResearchTimeline;
