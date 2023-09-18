import { useState, memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchChallenges } from "@/services/challenges.service";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import Image from "../Image/Image";
import { Link } from "react-router-dom";

import "./Search.scss";
import Paragraph from "../Paragraph/Paragraph";
import Heading from "../Heading/Heading";

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
        <div className="search__options__container">
          {data?.data.map((suggestion: any) => {
            return (
              <div className="search__option">
                <Link to={`/challenges/${suggestion.id}`} className="search__option__container">
                  <div className="search__option__img">
                    <Image
                      src={suggestion?.resources?.[0]?.value}
                      alt={suggestion.title}
                      width="500"
                      height="50"
                    />
                  </div>
                  <Heading tag="h4" level="quaternary">
                    {suggestion.title}
                  </Heading>
                  <Paragraph>{suggestion.description}</Paragraph>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});
