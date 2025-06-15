import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Award } from "lucide-react";

interface ModuleProgress {
  id: number;
  title: string;
  completion: number;
  totalSections: number;
  completedSections: number;
}

interface BootcampProgressProps {
  modules: ModuleProgress[];
  overallCompletion: number;
  startDate?: string;
  estimatedCompletionDate?: string;
  className?: string;
}

const BootcampProgress = ({
  modules = [],
  overallCompletion = 0,
  startDate,
  estimatedCompletionDate,
  className = "",
}: BootcampProgressProps) => {
  // Calculate total completed sections across all modules
  const totalSections = modules.reduce(
    (sum, module) => sum + module.totalSections,
    0,
  );
  const completedSections = modules.reduce(
    (sum, module) => sum + module.completedSections,
    0,
  );

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Bootcamp Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Completion</span>
              <span className="text-sm">{Math.round(overallCompletion)}%</span>
            </div>
            <Progress value={overallCompletion} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {completedSections} of {totalSections} sections completed
              </span>
              {overallCompletion === 100 ? (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-800 flex items-center"
                >
                  <CheckCircle className="h-3 w-3 mr-1" /> Completed
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 flex items-center"
                >
                  <Clock className="h-3 w-3 mr-1" /> In Progress
                </Badge>
              )}
            </div>
          </div>

          {/* Module breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Module Breakdown</h4>
            {modules.map((module) => (
              <div key={module.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs">
                    Day {module.id}: {module.title}
                  </span>
                  <span className="text-xs">{module.completion}%</span>
                </div>
                <Progress value={module.completion} className="h-1.5" />
              </div>
            ))}
          </div>

          {/* Timeline */}
          {(startDate || estimatedCompletionDate) && (
            <div className="pt-2 border-t">
              <h4 className="text-sm font-medium mb-2">Timeline</h4>
              <div className="grid grid-cols-2 gap-4">
                {startDate && (
                  <div className="text-xs">
                    <span className="block text-muted-foreground">Started</span>
                    <span>{startDate}</span>
                  </div>
                )}
                {estimatedCompletionDate && (
                  <div className="text-xs text-right">
                    <span className="block text-muted-foreground">
                      Est. Completion
                    </span>
                    <span>{estimatedCompletionDate}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Certificate status */}
          {overallCompletion === 100 && (
            <div className="pt-2 border-t flex items-center justify-between">
              <div className="flex items-center">
                <Award className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-sm font-medium">
                  Certificate Available
                </span>
              </div>
              <Badge className="bg-amber-100 text-amber-800">Download</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BootcampProgress;
