"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

export function useToast() {
  const [open, setOpen] = React.useState(false);

  const toast = ({ title, description, variant }: { title: string; description: string; variant?: string }) => {
    setOpen(true);
  };

  return { toast, open, setOpen };
}