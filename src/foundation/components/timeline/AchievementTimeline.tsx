import { Award, Star, Trophy } from "lucide-react";

interface AchievementTimelineProps {
  achievements: {
    title: string;
    date: string;
    description: string;
    level: number;
  }[];
  title: string;
  icon?: React.ReactNode;
}
// 1. Achievement Timeline - Các thành tích đạt đượcs
const AchievementTimeline = ({
  achievements,
  title,
  icon,
}: AchievementTimelineProps) => {
  return (
    <div className="p-4 border shadow-lg md:p-6 lg:p-8 bg-gradient-to-br from-warning/5 to-accent/5 rounded-xl md:rounded-2xl border-warning/20">
      <div className="flex items-center gap-2 mb-4 md:gap-3 md:mb-6 lg:mb-8">
        {icon || (
          <Trophy className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-warning" />
        )}
        <h2 className="text-lg font-bold md:text-xl lg:text-2xl text-text-primary">
          {title}
        </h2>
      </div>

      <div className="space-y-3 md:space-y-4 lg:space-y-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="group relative bg-background-elevated rounded-xl p-3 md:p-4 lg:p-6 shadow-md border-l-2 md:border-l-3 lg:border-l-4 border-warning hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
              <div className="flex-shrink-0 p-2 md:p-2.5 lg:p-3 rounded-full bg-warning/10">
                <Award className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-warning" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1 md:mb-2">
                  <h3 className="text-base font-semibold md:text-lg text-text-primary">
                    {achievement.title}
                  </h3>
                  <span className="px-2 py-1 text-xs rounded-full md:px-3 md:text-sm text-text-secondary bg-background-muted">
                    {achievement.date}
                  </span>
                </div>
                <p className="mb-2 text-xs md:mb-3 md:text-sm text-text-secondary">
                  {achievement.description}
                </p>
                <div className="flex items-center gap-1 md:gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 md:w-4 md:h-4 ${i < achievement.level ? "text-warning fill-warning" : "text-border-subtle"}`}
                    />
                  ))}
                  <span className="ml-1 text-xs md:ml-2 md:text-sm text-text-secondary">
                    {achievement.level}/5
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AchievementTimeline;
