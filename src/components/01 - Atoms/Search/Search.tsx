import { useState } from "react";
import Svg from "../Svg/Svg";
import { useSearch } from "@/hooks/useSearch";
import "./Search.scss";

export interface ISearch {
  placeholder: string;
}

export default function Search({ placeholder }: ISearch) {
  const [value, setValue] = useState("");
  const { data } = useSearch(value);

  return (
    <div className="search">
      <div className="search__input">
        <Svg id="glass" />
        <input
          type="search"
          className="search__text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {data?.data && (
        <div className="search__options">
          {data?.data.map((suggestion: any) => {
            return <div className="option">{suggestion}</div>;
          })}
        </div>
      )}
    </div>
  );
}
