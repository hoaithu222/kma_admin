import { Users, Clock, MapPin } from "lucide-react";

interface EventTimelineProps {
  events: {
    title: string;
    date: string;
    description: string;
    location?: string;
    participants?: string;
  }[];
  title: string;
  icon?: React.ReactNode;
}
// 2. Event Timeline - Các sự kiện quan trọng
const EventTimeline = ({ events }: EventTimelineProps) => {
  return (
    <div className="relative">
      {events.map((event, index) => (
        <div
          key={index}
          className="relative flex gap-3 pb-4 md:gap-4 lg:gap-6 md:pb-6 lg:pb-8 last:pb-0"
        >
          {index < events.length - 1 && (
            <div className="absolute left-3 md:left-4 lg:left-6 top-6 md:top-8 lg:top-12 w-0.5 md:w-0.75 lg:w-1 h-full bg-gradient-to-b from-success to-success-light opacity-30"></div>
          )}

          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full shadow-lg md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-success to-success-light">
            <Clock className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-text-on-success" />
          </div>

          <div className="flex-1 bg-background-elevated rounded-xl p-3 md:p-4 lg:p-6 shadow-md border border-border-subtle group hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <h3 className="text-base font-semibold md:text-lg text-text-primary">
                {event.title}
              </h3>
              <div className="text-right">
                <div className="text-xs font-medium md:text-sm text-success">
                  {event.date}
                </div>
                {event.location && (
                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <MapPin className="w-2 h-2 md:w-3 md:h-3" />
                    {event.location}
                  </div>
                )}
              </div>
            </div>
            <p className="mb-2 text-xs md:mb-3 md:text-sm text-text-secondary">
              {event.description}
            </p>
            {event.participants && (
              <div className="flex items-center gap-1 text-xs md:gap-2 md:text-sm text-text-secondary">
                <Users className="w-3 h-3 md:w-4 md:h-4" />
                <span>{event.participants}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default EventTimeline;
