import { useCallback, useReducer, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { likeChallenge, unlikeChallenge } from "@/services/challenges.service";
import "./Like.scss";

export interface ILike {
  id: number;
  isAlreadyLiked: boolean;
  likesCount?: number;
  showNumber: boolean;
}

export default function Like({ id, isAlreadyLiked, likesCount = 0, showNumber }: ILike) {
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [count, setCount] = useState(likesCount);
  const { mutate: like } = useMutation(likeChallenge);
  const { mutate: unlike } = useMutation(unlikeChallenge);

  const handleLike = useCallback(() => {
    isLiked ? unlike(id) : like(id);
    setIsLiked(!isLiked);
    setCount((prev) => (!isLiked ? prev + 1 : prev - 1));
  }, [isLiked]);

  return (
    <div className={`like like--${isLiked}`} onClick={handleLike}>
      <Svg id="like" />
      {showNumber && <p className="like__count">{count}</p>}
    </div>
  );
}
