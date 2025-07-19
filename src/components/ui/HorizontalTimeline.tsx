import React from 'react';
import { CheckCircle, XCircle, Circle } from 'lucide-react';

export interface TimelineStep {
    key: string;
    label: string;
    date?: string;
    isCompleted: boolean;
    isActive?: boolean;
    isCancelled?: boolean;
}

interface HorizontalTimelineProps {
    steps: TimelineStep[];
    className?: string;
}

export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({
                                                                          steps,
                                                                          className = ""
                                                                      }) => {
    // Calculate progress percentage
    const completedSteps = steps.filter(s => s.isCompleted && !s.isCancelled).length;
    const progressPercentage = steps.length > 1 ? ((completedSteps - 1) / (steps.length - 1)) * 100 : 0;

    return (
        <div className={`w-full py-6 ${className}`}>
            <div className="relative">
                {/* Background line */}
                <div
                    className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200"
                    style={{
                        width: `calc(100% - 48px)`,
                        marginLeft: '24px'
                    }}
                />

                {/* Progress line */}
                <div
                    className="absolute top-6 left-6 h-0.5 bg-blue-600 transition-all duration-700 ease-out"
                    style={{
                        width: `calc(${Math.max(0, progressPercentage)}% * (100% - 48px) / 100)`,
                        marginLeft: '24px'
                    }}
                />

                {/* Steps container */}
                <div className="flex justify-between items-start relative">
                    {steps.map((step, index) => {
                        const isCancelled = step.isCancelled;
                        const isCompleted = step.isCompleted;
                        const isActive = step.isActive;

                        return (
                            <div
                                key={step.key}
                                className="flex flex-col items-center relative"
                                style={{ flex: '0 0 auto' }}
                            >
                                {/* Step indicator */}
                                <div
                                    className={`
                                        relative z-10 w-12 h-12 rounded-full border-2 
                                        flex items-center justify-center
                                        transition-all duration-300 ease-in-out
                                        ${isCancelled
                                        ? 'border-red-500 bg-red-500 text-white shadow-lg'
                                        : isCompleted
                                            ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
                                            : isActive
                                                ? 'border-blue-600 bg-white text-blue-600 shadow-lg shadow-blue-100'
                                                : 'border-gray-300 bg-white text-gray-400'
                                    }
                                    `}
                                >
                                    {isCancelled ? (
                                        <XCircle className="w-5 h-5" />
                                    ) : isCompleted ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : isActive ? (
                                        <Circle className="w-5 h-5 fill-current" />
                                    ) : (
                                        <div className="w-3 h-3 bg-current rounded-full" />
                                    )}
                                </div>

                                {/* Step content */}
                                <div className="mt-4 text-center max-w-32">
                                    <h4
                                        className={`
                                            text-sm font-semibold leading-tight mb-1
                                            ${isCancelled
                                            ? 'text-red-600'
                                            : isCompleted
                                                ? 'text-gray-900'
                                                : isActive
                                                    ? 'text-blue-600'
                                                    : 'text-gray-500'
                                        }
                                        `}
                                    >
                                        {step.label}
                                    </h4>
                                    {step.date && (
                                        <p className="text-xs text-gray-500 font-medium">
                                            {step.date}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HorizontalTimeline;