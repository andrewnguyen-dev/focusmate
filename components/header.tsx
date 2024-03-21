import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { IconSettings, IconMusic } from "@tabler/icons-react";
import Setting from "./setting";
import MusicMixer from "./music-mixer";

const Header = () => {
  return (
    <header className="flex justify-between mt-8">
      <h1 className="text-gray-50 font-bold sm:text-4xl sm:mx-8">
        focusmate.
      </h1>
      <div className="sm:mx-8 flex gap-4">
        <div>
          <Dialog>
            <DialogTrigger>
              <IconSettings
                stroke={2}
                size={36}
                className="text-gray-50 p-1 border-2 border-gray-50 rounded-[16px] hover:bg-gray-50 hover:text-gray-800 transition-all ease-in"
              />
            </DialogTrigger>
            <DialogContent>
              <Setting />
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Drawer>
            <DrawerTrigger>
              <IconMusic
                stroke={2}
                size={36}
                className="text-gray-50 p-1 border-2 border-gray-50 rounded-[16px] hover:bg-gray-50 hover:text-gray-800 transition-all ease-in"
              />
            </DrawerTrigger>
            <DrawerContent>
              <MusicMixer />
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Header;
