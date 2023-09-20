import { useCallback, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { AuthContext } from "@/contexts/AuthContext";
import { likeChallenge, unlikeChallenge } from "@/services/challenges.service";
import "./Like.scss";
import useToasts from "@/hooks/useToasts";
import { likeComment, unlikeComment } from "@/services/comments.service";
import { t } from "i18next";
import { likeSolution, unlikeSolution } from "@/services/solutions.service";

export interface ILike {
  id: number;
  isAlreadyLiked?: boolean;
  likesCount?: number;
  showNumber: boolean;
  type?: string;
}

export default function Like({ id, isAlreadyLiked, likesCount = 0, showNumber, type = "Challenge" }: ILike) {

  const likeType: { [key: string]: any } = {
    'Challenge': likeChallenge,
    'Comment': likeComment,
    'Solution': likeSolution
  };

  const unlikeType: { [key: string]: any } = {
    'Challenge': unlikeChallenge,
    'Comment': unlikeComment,
    'Solution': unlikeSolution
  }

  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [count, setCount] = useState(likesCount);
  const { mutate: like } = useMutation(likeType[type]);
  const { mutate: unlike } = useMutation(unlikeType[type]);
  const { isConnected } = useContext(AuthContext);
  const { pushToast } = useToasts();

  const handleLike = useCallback(() => {
    // @ts-ignore
    isLiked ? unlike(id) : like(id);
    setIsLiked(!isLiked);
    setCount((prev) => (!isLiked ? prev + 1 : prev - 1));
  }, [isLiked]);

  return (
    <div
      className={`like like--${isLiked ?? "false"}`}
      onClick={() => {
        isConnected
          ? handleLike()
          : pushToast({
            theme: "secondary",
            title: t("You must be logged in"),
            desc: t("You must be logged in to like a challenge")
          });
      }}>
      <Svg id="like" />
      {showNumber && <p className="like__count">{count}</p>}
    </div>
  );
}
