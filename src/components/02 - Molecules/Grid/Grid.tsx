import "./Grid.scss";

<<<<<<< Updated upstream
export default function Grid({ children }: any) {
  return <div className="grid">{children}</div>;
=======
export interface IGrid {
  children: ReactNode;
  size: string;
  styles: CSSProperties;
}

export default function Grid({ children, size, styles }: any) {
  return (
    <div className="grid" style={{ ...styles, "--size": size } as CSSProperties}>
      {children}
    </div>
  );
>>>>>>> Stashed changes
}
