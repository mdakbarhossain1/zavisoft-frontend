import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-360 mx-auto px-15">{children}</div>;
}
