"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  getLongBreakTime,
  getPomodoroTime,
  getShortBreakTime,
} from "@/lib/utils";
import { useState } from "react";
import { useTimeContext } from "@/context/time-context";

const formSchema = z.object({
  pomodoroTime: z.coerce.number().min(1).max(60),
  shortBreakTime: z.coerce.number().min(1).max(15),
  longBreakTime: z.coerce.number().min(1).max(30),
});

const SettingTimer = () => {
  const {
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
  } = useTimeContext();

  const [successMessage, setSuccessMessage] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pomodoroTime: pomodoroTime / 60,
      shortBreakTime: shortBreakTime / 60,
      longBreakTime: longBreakTime / 60,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setSuccessMessage("Settings saved");
    localStorage.setItem(
      "pomodoroTime",
      JSON.stringify(data.pomodoroTime * 60)
    );
    localStorage.setItem(
      "shortBreakTime",
      JSON.stringify(data.shortBreakTime * 60)
    );
    localStorage.setItem(
      "longBreakTime",
      JSON.stringify(data.longBreakTime * 60)
    );
    setPomodoroTime(data.pomodoroTime * 60);
    setShortBreakTime(data.shortBreakTime * 60);
    setLongBreakTime(data.longBreakTime * 60);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="pomodoroTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pomodoro</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>minutes</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortBreakTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Break</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>minutes</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longBreakTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Long Break</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormDescription>minutes</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {successMessage && (
          <p className="text-sm text-yellow-300">{successMessage}</p>
        )}
        <Button type="submit" className="px-8">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default SettingTimer;
