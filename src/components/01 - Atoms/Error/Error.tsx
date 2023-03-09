import "./Error.scss";

export default function Error({ children }: { children: JSX.Element }) {
  return <p className="error">{children}</p>;
}
