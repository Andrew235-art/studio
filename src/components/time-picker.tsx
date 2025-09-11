"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { ControllerRenderProps } from "react-hook-form"
import { Input } from "./ui/input"

interface TimePickerProps {
    field: ControllerRenderProps<any, any>;
}

export function TimePicker({ field }: TimePickerProps) {
  return (
    <div className="relative">
      <Input type="time" {...field} className="pl-10" />
      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  )
}
