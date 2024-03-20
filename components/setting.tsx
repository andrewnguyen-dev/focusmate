import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingTimer from "./setting-timer";
import SettingBackground from "./setting-background";

const Setting = () => {
  return (
    <Tabs defaultValue="background" className="w-[450px]">
      <TabsList>
        <TabsTrigger value="timer">Timer</TabsTrigger>
        <TabsTrigger value="background">Background</TabsTrigger>
      </TabsList>
      <TabsContent value="timer">
        <SettingTimer />
      </TabsContent>
      <TabsContent value="background">
        <SettingBackground />
      </TabsContent>
    </Tabs>
  );
};

export default Setting;
