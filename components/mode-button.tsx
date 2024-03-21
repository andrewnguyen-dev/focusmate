import React from "react";
import clsx from "clsx";

type ModeButtonProps = {
  label: string;
  sessionType: string;
  onClick: () => void;
};

const ModeButton = ({ label, sessionType, onClick }: ModeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "text-gray-50 py-2 px-5 font-medium border-2 border-gray-50 rounded-[16px] hover:bg-gray-50 hover:text-gray-900 transition-all ease-in",
        {
          "bg-gray-50 text-gray-900": sessionType === label,
        }
      )}
    >
      {label}
    </button>
  );
};

export default ModeButton;
