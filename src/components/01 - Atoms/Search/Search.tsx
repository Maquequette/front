import { useState, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchChallenges } from "@/services/challenges.service";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { Link } from "react-router-dom";

import "./Search.scss";

export interface ISearch {
  placeholder: string;
  className?: string;
}

export default memo(function Search({ placeholder, className }: ISearch) {
  const [value, setValue] = useState("");
  const { data } = useQuery(["search", value], () => searchChallenges(value), {
    enabled: value.length > 0
  });

  return (
    <div className={`search ${className ?? ""} ${data?.data ? "active" : ""}`}>
      <div className="search__input">
        <Svg id="glass" />
        <input
          id="search"
          type="search"
          className="search__text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="search__options">
        {data?.data.map((suggestion: any) => {
          return (
            <div className="search__option">
              <Link to={`/challenges/${suggestion.id}`} className="search__option__container">
                {suggestion.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
});
