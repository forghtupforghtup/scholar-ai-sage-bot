
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Subject {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface SubjectSelectorProps {
  subjects: Subject[];
  selectedSubject: string;
  onSubjectChange: (subject: string) => void;
}

const SubjectSelector = ({ subjects, selectedSubject, onSubjectChange }: SubjectSelectorProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <span className="text-purple-400">📚</span>
        Study Subjects
      </h3>
      <div className="space-y-2">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const isSelected = selectedSubject === subject.id;
          
          return (
            <button
              key={subject.id}
              onClick={() => onSubjectChange(subject.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-105",
                isSelected
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg",
                isSelected ? "bg-white/20" : subject.color
              )}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-left flex-1">
                <div className="font-medium">{subject.name}</div>
              </div>
              {isSelected && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Study Tips */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl border border-purple-500/20">
        <h4 className="text-purple-300 font-medium mb-2">💡 Study Tip</h4>
        <p className="text-slate-300 text-sm">
          Be specific with your questions! Instead of "help with math," try "explain how to solve quadratic equations step by step."
        </p>
      </div>
    </div>
  );
};

export default SubjectSelector;
