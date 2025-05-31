import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Briefcase,
  Award,
  Calendar,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  User,
  Building,
} from "lucide-react";

/**
 * // Example usage with different configurations
const ExampleUsage = () => {
  // Academic data
  const academicData: TimelineItem[] = [
    {
      title: "Advanced React Development",
      description:
        "Deep dive into React ecosystem including hooks, context, and performance optimization",
      period: "2024 Q1",
      status: "completed",
      progress: 100,
      grade: "A+",
      location: "FPT University",
      credits: "4 credits",
      instructor: "Dr. Nguyen Van A",
      tags: ["Core", "Frontend"],
      customFields: {
        Prerequisites: "Basic React, JavaScript ES6",
        "Final Project": "E-commerce application",
      },
    },
    {
      title: "Database Design & Management",
      description:
        "Comprehensive study of database design principles, SQL optimization, and NoSQL databases",
      period: "2024 Q2",
      status: "in-progress",
      progress: 75,
      location: "Online",
      credits: "3 credits",
      tags: ["Core", "Backend"],
      customFields: {
        Technologies: "PostgreSQL, MongoDB, Redis",
      },
    },
    {
      title: "Machine Learning Fundamentals",
      description:
        "Introduction to ML algorithms, data preprocessing, and model evaluation",
      period: "2024 Q3",
      status: "planned",
      credits: "4 credits",
      tags: ["Elective", "AI/ML"],
    },
  ];

  // Professional experience data
  const professionalData: TimelineItem[] = [
    {
      title: "Senior Frontend Developer",
      description:
        "Led development of customer-facing web applications using React and TypeScript",
      period: "2023-Present",
      status: "in-progress",
      location: "Tech Corp, Hanoi",
      tags: ["Full-time", "Leadership"],
      customFields: {
        "Team Size": "5 developers",
        "Key Achievement": "Improved app performance by 40%",
      },
    },
    {
      title: "Frontend Developer",
      description:
        "Developed and maintained multiple client projects using modern web technologies",
      period: "2021-2023",
      status: "completed",
      location: "Startup Inc, Ho Chi Minh",
      tags: ["Full-time", "Startup"],
      customFields: {
        Technologies: "React, Vue.js, Node.js",
        Projects: "10+ successful deliveries",
      },
    },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Flexible Timeline Examples
      </h1>


      <FlexibleTimeline
        data={academicData}
        title="Academic Progress"
        theme="academic"
        colorScheme="blue"
        showProgress={true}
        showTags={true}
        showStatus={true}
        expandable={true}
      />


      <FlexibleTimeline
        data={professionalData}
        title="Professional Experience"
        theme="professional"
        colorScheme="green"
        layout="left"
        showTags={true}
        compact={false}
      />


      <FlexibleTimeline
        data={academicData.slice(0, 2)}
        title="Quick Overview"
        theme="personal"
        colorScheme="purple"
        compact={true}
        showProgress={false}
        showTags={false}
      />
    </div>
  );
};

export default ExampleUsage;
// Example usage with different configurations
const ExampleUsage = () => {
  // Academic data
  const academicData: TimelineItem[] = [
    {
      title: "Advanced React Development",
      description:
        "Deep dive into React ecosystem including hooks, context, and performance optimization",
      period: "2024 Q1",
      status: "completed",
      progress: 100,
      grade: "A+",
      location: "FPT University",
      credits: "4 credits",
      instructor: "Dr. Nguyen Van A",
      tags: ["Core", "Frontend"],
      customFields: {
        Prerequisites: "Basic React, JavaScript ES6",
        "Final Project": "E-commerce application",
      },
    },
    {
      title: "Database Design & Management",
      description:
        "Comprehensive study of database design principles, SQL optimization, and NoSQL databases",
      period: "2024 Q2",
      status: "in-progress",
      progress: 75,
      location: "Online",
      credits: "3 credits",
      tags: ["Core", "Backend"],
      customFields: {
        Technologies: "PostgreSQL, MongoDB, Redis",
      },
    },
    {
      title: "Machine Learning Fundamentals",
      description:
        "Introduction to ML algorithms, data preprocessing, and model evaluation",
      period: "2024 Q3",
      status: "planned",
      credits: "4 credits",
      tags: ["Elective", "AI/ML"],
    },
  ];

  // Professional experience data
  const professionalData: TimelineItem[] = [
    {
      title: "Senior Frontend Developer",
      description:
        "Led development of customer-facing web applications using React and TypeScript",
      period: "2023-Present",
      status: "in-progress",
      location: "Tech Corp, Hanoi",
      tags: ["Full-time", "Leadership"],
      customFields: {
        "Team Size": "5 developers",
        "Key Achievement": "Improved app performance by 40%",
      },
    },
    {
      title: "Frontend Developer",
      description:
        "Developed and maintained multiple client projects using modern web technologies",
      period: "2021-2023",
      status: "completed",
      location: "Startup Inc, Ho Chi Minh",
      tags: ["Full-time", "Startup"],
      customFields: {
        Technologies: "React, Vue.js, Node.js",
        Projects: "10+ successful deliveries",
      },
    },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Flexible Timeline Examples
      </h1>

      <FlexibleTimeline
        data={academicData}
        title="Academic Progress"
        theme="academic"
        colorScheme="blue"
        showProgress={true}
        showTags={true}
        showStatus={true}
        expandable={true}
      />


      <FlexibleTimeline
        data={professionalData}
        title="Professional Experience"
        theme="professional"
        colorScheme="green"
        layout="left"
        showTags={true}
        compact={false}
      />


      <FlexibleTimeline
        data={academicData.slice(0, 2)}
        title="Quick Overview"
        theme="personal"
        colorScheme="purple"
        compact={true}
        showProgress={false}
        showTags={false}
      />
    </div>
  );
};

export default ExampleUsage;

 *
 *
 *
 *
 */
interface TimelineItem {
  // Core fields
  title: string;
  description: string;

  // Time indicators (flexible)
  period?: string; // "2023-2024", "Q1 2024", "Jan 2024"
  date?: string; // "15/01/2024"
  duration?: string; // "6 months", "2 years"

  // Status/Progress
  status?: "completed" | "in-progress" | "planned" | "cancelled";
  progress?: number; // 0-100 for progress bar
  grade?: string; // "A+", "Pass", "Excellent"

  // Additional info
  location?: string; // "Hanoi University", "Remote"
  credits?: string; // "3 credits", "120 hours"
  instructor?: string; // "Dr. Smith"
  department?: string; // "Computer Science"

  // Visual customization
  color?: string; // Custom color for this item
  icon?: React.ReactNode; // Custom icon

  // Links and attachments
  link?: string; // External link
  certificate?: string; // Certificate link

  // Tags
  tags?: string[]; // ["Core", "Elective", "Online"]

  // Custom fields for flexibility
  customFields?: { [key: string]: string };
}

interface FlexibleTimelineProps {
  data: TimelineItem[];
  title: string;

  // Visual customization
  icon?: React.ReactNode;
  theme?: "academic" | "professional" | "personal" | "project";
  colorScheme?: "blue" | "green" | "purple" | "orange" | "red";

  // Layout options
  layout?: "left" | "center" | "right";
  showProgress?: boolean;
  showTags?: boolean;
  showStatus?: boolean;
  compact?: boolean;
  isHeader?: boolean;

  // Interaction
  onItemClick?: (item: TimelineItem, index: number) => void;
  expandable?: boolean;
}

const FlexibleTimeline = ({
  data,
  title,
  icon,
  theme = "academic",
  colorScheme = "blue",
  layout = "left",
  showProgress = false,
  showTags = true,
  showStatus = true,
  compact = false,
  onItemClick,
  expandable = false,
  isHeader = false,
}: FlexibleTimelineProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Theme configurations
  const themes = {
    academic: {
      defaultIcon: <GraduationCap className="w-5 h-5" />,
      itemIcon: <BookOpen className="w-4 h-4" />,
    },
    professional: {
      defaultIcon: <Briefcase className="w-5 h-5" />,
      itemIcon: <Building className="w-4 h-4" />,
    },
    personal: {
      defaultIcon: <User className="w-5 h-5" />,
      itemIcon: <Star className="w-4 h-4" />,
    },
    project: {
      defaultIcon: <Award className="w-5 h-5" />,
      itemIcon: <CheckCircle className="w-4 h-4" />,
    },
  };

  const colorSchemes = {
    blue: {
      primary: "text-secondary",
      bg: "bg-secondary/5",
      border: "border-secondary/20",
      accent: "bg-secondary/10 text-secondary",
    },
    green: {
      primary: "text-success",
      bg: "bg-success/5",
      border: "border-success/20",
      accent: "bg-success/10 text-success",
    },
    purple: {
      primary: "text-accent",
      bg: "bg-accent/5",
      border: "border-accent/20",
      accent: "bg-accent/10 text-accent",
    },
    orange: {
      primary: "text-warning",
      bg: "bg-warning/5",
      border: "border-warning/20",
      accent: "bg-warning/10 text-warning",
    },
    red: {
      primary: "text-error",
      bg: "bg-error/5",
      border: "border-error/20",
      accent: "bg-error/10 text-error",
    },
  };

  const statusColors = {
    completed: "bg-success/10 text-success border-success/20",
    "in-progress": "bg-secondary/10 text-secondary border-secondary/20",
    planned: "bg-warning/10 text-warning border-warning/20",
    cancelled: "bg-error/10 text-error border-error/20",
  };

  const currentTheme = themes[theme];
  const currentColors = colorSchemes[colorScheme];

  const toggleExpanded = (index: number) => {
    if (!expandable) return;

    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item: TimelineItem, index: number) => {
    if (expandable) {
      toggleExpanded(index);
    }
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  const formatPeriod = (item: TimelineItem) => {
    if (item.period) return item.period;
    if (item.date) return item.date;
    if (item.duration) return item.duration;
    return "";
  };

  return (
    <div className="p-3 md:p-4 lg:p-6 border shadow-lg bg-background-elevated border-border-subtle rounded-xl md:rounded-2xl">
      {/* Header */}
      {isHeader && (
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className={`p-1.5 md:p-2 rounded-lg ${currentColors.bg}`}>
            {icon || currentTheme.defaultIcon}
          </div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-text-primary">
            {title}
          </h2>
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        <div
          className={`absolute ${layout === "center" ? "left-1/2 transform -translate-x-px" : "left-3 md:left-4 lg:left-6"} top-0 bottom-0 w-0.5 md:w-0.75 lg:w-1 bg-gradient-to-b from-border-subtle to-border-subtle/50`}
        ></div>

        {data.map((item, index) => {
          const isExpanded = expandedItems.has(index);
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className={`relative flex ${layout === "center" ? "justify-center" : "items-start"} gap-2 md:gap-3 lg:gap-4 ${compact ? "pb-3 md:pb-4" : "pb-4 md:pb-5 lg:pb-6"} group`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleItemClick(item, index)}
            >
              {/* Time indicator */}
              <div
                className={`relative z-10 flex items-center justify-center ${compact ? "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-xs" : "w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-xs md:text-sm"} font-semibold transition-all duration-300 rounded-full shadow-md ${currentColors.bg} ${currentColors.primary} ${isHovered ? "scale-110 shadow-lg" : ""} ${expandable || onItemClick ? "cursor-pointer" : ""}`}
              >
                {item.icon || <Calendar className="w-3 h-3 md:w-4 md:h-4" />}
              </div>

              {/* Content */}
              <div
                className={`flex-1 ${layout === "center" ? "max-w-[200px] md:max-w-[300px] lg:max-w-md" : ""}`}
              >
                <div
                  className={`bg-background-elevated rounded-xl p-3 md:p-4 lg:p-6 shadow-md border border-border-subtle transition-all duration-300 ${
                    isHovered ? "shadow-xl scale-[1.02]" : ""
                  } ${expandable || onItemClick ? "cursor-pointer" : ""}`}
                >
                  {/* Main content */}
                  <div className="flex items-start justify-between mb-1 md:mb-2">
                    <div className="flex items-center gap-1.5 md:gap-2">
                      <div
                        className={`p-1 md:p-1.5 rounded ${currentColors.bg}`}
                      >
                        {currentTheme.itemIcon}
                      </div>
                      <h3
                        className={`font-semibold text-text-primary ${compact ? "text-xs md:text-sm" : "text-sm md:text-base"}`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Period */}
                    {formatPeriod(item) && (
                      <span className="text-xs font-medium text-text-secondary">
                        {formatPeriod(item)}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className={`text-text-secondary mb-2 md:mb-3 ${compact ? "text-xs" : "text-xs md:text-sm"} ${!isExpanded && expandable ? "line-clamp-2" : ""}`}
                  >
                    {item.description}
                  </p>

                  {/* Progress bar */}
                  {showProgress && item.progress !== undefined && (
                    <div className="mb-2 md:mb-3">
                      <div className="flex justify-between mb-1 text-xs text-text-secondary">
                        <span>Progress</span>
                        <span>{item.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 md:h-2 rounded-full bg-background-muted">
                        <div
                          className={`h-1.5 md:h-2 rounded-full bg-gradient-to-r ${currentColors.primary.replace("text-", "from-")} to-opacity-70`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Status */}
                  {showStatus && item.status && (
                    <div className="mb-2 md:mb-3">
                      <span
                        className={`inline-flex items-center px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-medium rounded-full border ${statusColors[item.status]}`}
                      >
                        {item.status === "completed" && (
                          <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                        )}
                        {item.status === "in-progress" && (
                          <Clock className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                        )}
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1).replace("-", " ")}
                      </span>
                    </div>
                  )}

                  {/* Additional info (expanded or always shown) */}
                  <div
                    className={`space-y-1.5 md:space-y-2 ${!isExpanded && expandable ? "hidden" : ""}`}
                  >
                    {item.location && (
                      <div className="flex items-center gap-1.5 md:gap-2 text-xs text-text-secondary">
                        <MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        <span>{item.location}</span>
                      </div>
                    )}

                    {item.instructor && (
                      <div className="flex items-center gap-1.5 md:gap-2 text-xs text-text-secondary">
                        <User className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        <span>{item.instructor}</span>
                      </div>
                    )}

                    {/* Custom fields */}
                    {item.customFields &&
                      Object.entries(item.customFields).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center gap-1.5 md:gap-2 text-xs text-text-secondary"
                        >
                          <span className="font-medium">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                  </div>

                  {/* Footer with tags, credits, grade */}
                  <div className="flex items-center justify-between pt-2 md:pt-3 mt-2 md:mt-3 border-t border-border-subtle">
                    <div className="flex flex-wrap items-center gap-1 md:gap-2">
                      {showTags &&
                        item.tags &&
                        item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs rounded-full ${currentColors.accent}`}
                          >
                            {tag}
                          </span>
                        ))}

                      {item.credits && (
                        <span className="px-1.5 md:px-2 py-0.5 md:py-1 text-xs rounded-full text-text-secondary bg-background-muted">
                          {item.credits}
                        </span>
                      )}
                    </div>

                    {item.grade && (
                      <span className="px-1.5 md:px-2 py-0.5 md:py-1 text-xs font-medium rounded-full text-success bg-success/10">
                        {item.grade}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FlexibleTimeline;
