import React from "react";
// import { cn } from ""; 

export const alert = ({ variant = "default", children }) => {
  return (
    <div
      className={cn(
        "p-4 rounded-lg flex items-start gap-3",
        variant === "destructive"
          ? "bg-red-100 text-red-800 border border-red-300"
          : "bg-green-100 text-green-800 border border-green-300"
      )}
    >
      {children}
    </div>
  );
};

export const alertTitle = ({ children }) => (
  <strong className="block font-medium">{children}</strong>
);

export const alertDescription = ({ children }) => (
  <span className="text-sm">{children}</span>
);
