import clsx from 'clsx';
import { Plane, User } from 'lucide-react';
import { ReactNode } from 'react';
import { ChatStep } from '../app/chatSteps/helpers/createChatSteps';

function ChatMessageList({
  steps,
  currentStepIndex,
}: {
  steps: ChatStep[];
  currentStepIndex: number;
}) {
  return (
    <div className="flex flex-col-reverse h-full my-4">
      <div className="space-y-3">
        {steps
          .filter((_, i) => i <= currentStepIndex)
          .map((chatStep, index) => (
            <div key={chatStep.stepName} className="space-y-3 w-full">
              <InstructionsCard instructions={chatStep.instructions} step={index} />
              <FormCard current={index === currentStepIndex} form={chatStep.form} />
            </div>
          ))}
      </div>
    </div>
  );
}

function InstructionsCard({
  instructions,
  step,
}: {
  instructions?: ReactNode | string;
  step: number;
}) {
  return instructions ? (
    <div className="flex py-2 mr-14 text-left items-end gap-2">
      <Plane size={30} className="mx-1 bg-[#3358ae] text-white rounded-full p-1 shrink-0" />
      <div
        className={clsx(
          'p-6 text-left whitespace-normal text-white rounded-t-xl rounded-r-xl bg-[#3358ae]',
        )}
      >
        {instructions}
      </div>
    </div>
  ) : null;
}

function FormCard({ current, form }: { current?: boolean; form: ReactNode }) {
  return (
    <div className={clsx('flex items-end gap-2 justify-end')}>
      <div
        className={clsx(
          'ml-14 text-black self-center rounded-t-xl rounded-l-xl justify-end break-words w-auto max-w-1/2',
          current ? 'bg-[#97dbd9]' : 'bg-[#99abd7]',
        )}
      >
        <div className="p-6 text-left whitespace-normal">{form}</div>
      </div>
      {current ? (
        <div className="w-12">
          <User size={30} className={'text-black bg-[#97dbd9] rounded-full p-1 mx-1 shrink-0'} />
        </div>
      ) : (
        <div className="w-12"></div>
      )}
    </div>
  );
}

export default ChatMessageList;
