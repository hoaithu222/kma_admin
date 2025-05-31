import { Building, User } from "lucide-react";

interface FacultyTimelineProps {
  faculty: {
    name: string;
    position: string;
    specialization: string;
    experience?: string;
  }[];
  title: string;
  icon?: React.ReactNode;
}
// 3. Faculty Timeline - Các giảng viên và nhân sự
const FacultyTimeline = ({ faculty }: FacultyTimelineProps) => {
  return (
    <div className="grid gap-3 md:gap-4 lg:gap-6 md:grid-cols-2">
      {faculty.map((member, index) => (
        <div
          key={index}
          className="p-3 transition-all duration-300 border shadow-md md:p-4 lg:p-6 bg-background-elevated rounded-xl border-border-subtle group hover:shadow-xl hover:scale-105"
        >
          <div className="flex items-start gap-2 md:gap-3 lg:gap-4">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-primary to-secondary">
              <User className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-text-on-primary" />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-base font-semibold md:text-lg text-text-primary">
                {member.name}
              </h3>
              <p className="mb-1 text-sm font-medium md:mb-2 md:text-base text-primary">
                {member.position}
              </p>
              <p className="mb-2 text-xs md:mb-3 md:text-sm text-text-secondary">
                {member.specialization}
              </p>
              {member.experience && (
                <div className="flex items-center gap-1 text-xs md:gap-2 md:text-sm text-text-secondary">
                  <Building className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{member.experience}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FacultyTimeline;
