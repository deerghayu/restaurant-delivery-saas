import { CheckCircle, Clock } from 'lucide-react';

interface TimelineStep {
  status: string;
  time: Date;
  completed: boolean;
  description: string;
}

interface OrderTimelineProps {
  timeline: TimelineStep[];
  getTimeAgo: (date: Date) => string;
  getTimeUntil: (date: Date) => string;
}

export default function OrderTimeline({ timeline, getTimeAgo, getTimeUntil }: OrderTimelineProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-orange-200 hover:border-orange-300 transition-colors duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Order Timeline
      </h3>
      <div className="space-y-4">
        {timeline.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step.completed
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {step.completed ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4
                  className={`font-semibold ${
                    step.completed ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.status}
                </h4>
                <span className="text-sm text-gray-500">
                  {step.completed
                    ? getTimeAgo(step.time)
                    : getTimeUntil(step.time)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}