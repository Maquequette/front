import { ReactNode, memo } from "react";
import { Theme } from "@/types/Theme";
import "./Badge.scss";

export default memo(function Badge({ children, color }: { children: ReactNode; color: any }) {
  return (
    <div className="badge" style={{ backgroundColor: `${color?.code}` }}>
      {children}
    </div>
  );
});
