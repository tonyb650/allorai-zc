import { ArrowLeft, MessageCircle } from 'lucide-react';

type ModifyDetailProps = {
  handleGoBack?: () => void;
  handleOpenChat?: () => void;
};

export const ModifyDetails = ({ handleGoBack, handleOpenChat }: ModifyDetailProps) => {
  return (
    <>
      <p className="text-gray-600 mb-6">How would you like to modify your trip details?</p>
      <div className="space-y-3">
        <button
          onClick={handleGoBack}
          className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
        >
          <ArrowLeft size={24} className="text-primary" />
          <div>
            <div className="font-semibold text-gray-900">Return to Previous Step</div>
            <div className="text-sm text-gray-500">Go back and change your previous selection</div>
          </div>
        </button>
        <button
          onClick={handleOpenChat}
          className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
        >
          <MessageCircle size={24} className="text-primary" />
          <div>
            <div className="font-semibold text-gray-900">(Future Feature)</div>
            <div className="text-sm text-gray-500">
              Enter chat and tell us what you're looking for
            </div>
          </div>
        </button>
      </div>
    </>
  );
};
