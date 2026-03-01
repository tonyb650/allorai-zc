import { ArrowLeft, RotateCcw } from 'lucide-react';

type StartOverProps = {
  onClose: () => void;
  onReset: () => void;
};

export const StartOver = ({ onClose, onReset }: StartOverProps) => {
  return (
    <div className="space-y-3">
      <button
        onClick={onReset}
        className="w-full flex items-center gap-3 p-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors text-left"
      >
        <RotateCcw size={24} className="text-red-500" />
        <div>
          <div className="font-semibold text-gray-900">Reset Session</div>
          <div className="text-sm text-gray-500">Clear all trip details and start fresh</div>
        </div>
      </button>
      <button
        onClick={onClose}
        className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
      >
        <ArrowLeft size={24} className="text-primary" />
        <div>
          <div className="font-semibold text-gray-900">Go Back</div>
          <div className="text-sm text-gray-500">Continue working on your current trip</div>
        </div>
      </button>
    </div>
  );
};
