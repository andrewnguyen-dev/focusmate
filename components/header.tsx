import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconSettings } from "@tabler/icons-react";
import Setting from "./setting";

const Header = () => {
  return (
    <header className="flex justify-between">
      <h1 className="text-gray-50 font-bold sm:text-4xl sm:mt-8 sm:mx-8">
        focusmate.
      </h1>
      <div className="sm:mt-8 sm:mx-8">
        <Dialog>
          <DialogTrigger>
            <IconSettings
              stroke={2}
              size={36}
              className="text-gray-50 p-1 border-2 border-gray-50 rounded-[16px] hover:bg-gray-50 hover:text-gray-800 transition-colors"
            />
          </DialogTrigger>
          <DialogContent>
            <Setting />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
