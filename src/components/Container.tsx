import React from "react";

export const Container = (props: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full bg-slate-50">
        <div className="max-w-4xl mx-auto">{props.children}</div>
      </div>
    </div>
  );
};
