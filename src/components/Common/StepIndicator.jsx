import { FaCheck } from "react-icons/fa6";

const StepIndicator = ({ step, currentStep, title, subtitle, last }) => {
  const isCompleted = step < currentStep;
  const isActive = step === currentStep;

  return (
    <div className="d-flex align-items-center gap-3">
      <div className="d-flex flex-lg-row flex-column align-items-center gap-md-3 gap-2">
        {/* Step Number / Checkmark */}
        <div>
          <div
            className={`numberCons font-23 fw-medium d-flex justify-content-center align-items-center rounded-circle 
                ${
                  isCompleted
                    ? "bg-green2 text-white-100"
                    : isActive
                    ? "bg-danger text-white-100"
                    : "bg-black-7 text-black-55"
                }`}
          >
            {isCompleted ? <FaCheck /> : step}
          </div>
        </div>

        {/* Step Title */}
        <div>
          <div className="d-grid gap-1 text-center">
            {subtitle && (
              <span className="text-gray font-14 fw-normal text-nowrap d-lg-block d-none">
                {subtitle}
              </span>
            )}
            <span
              className={`font-14 fw-bold ${
                isActive
                  ? "text-danger"
                  : isCompleted
                  ? "text-green2"
                  : "text-gray"
              }`}
            >
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      {!last && (
        <div className="w-fill-available">
          <div
            className={`after ${
              isActive ? "bg-danger" : isCompleted ? "bg-green2" : "bg-gray"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default StepIndicator;
