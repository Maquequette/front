import { useCallback, useReducer, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { likeChallenge, unlikeChallenge } from "@/services/challenges.service";
import "./Like.scss";

export interface ILike {
  id: number;
  isAlreadyLiked: boolean;
}

export default function Like({ id, isAlreadyLiked }: ILike) {
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const { mutate: like } = useMutation(likeChallenge);
  const { mutate: unlike } = useMutation(unlikeChallenge);

  const handleLike = useCallback(() => {
    isLiked ? unlike(id) : like(id);
    setIsLiked(!isLiked);
  }, [isLiked]);

  return (
    <div className={`like like--${isLiked}`} onClick={handleLike}>
      <Svg id="like" />
    </div>
  );
}
