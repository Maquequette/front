import "./Badge.scss";

export default function Badge({ children }: { children: JSX.Element }) {
  return <div className="badge">{children}</div>;
}
