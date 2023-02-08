import React from "react";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// Global components
import Button from "components/Button";

const IgoRegister = ({
  isRegistered,
  loadingRegister,
  submitRegistrationProject,
}: any) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center bg-[#0b0b0be6] px-20 text-center">
      {isRegistered ? (
        <>
          <div>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="h-9 w-9 rounded-full bg-white text-success600"
            />
          </div>
          <div className="mt-6 font-avara text-xl font-extrabold text-white">
            Successfully Registered
          </div>
          <div className="mt-2 font-sora text-base font-light text-gray300">
            Please wait for the buying phase to start investing
          </div>
        </>
      ) : (
        <>
          <div className="font-avara text-xl font-extrabold text-white">
            Registeration Open
          </div>
          <div className="mt-2 font-sora text-base font-light text-gray300">
            Don&apos;t miss your chances. Tap “Register Now” to put yourself on
            the project whitelist
          </div>
          <Button
            className="mt-6 w-[136px] self-center"
            size="small"
            onClick={submitRegistrationProject}
            loading={loadingRegister}
          >
            Register Now
          </Button>
        </>
      )}
    </div>
  );
};

export default IgoRegister;
