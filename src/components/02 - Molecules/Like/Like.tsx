import { useCallback, useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import Svg from "@/components/01 - Atoms/Svg/Svg";
import { AuthContext } from "@/contexts/AuthContext";
import { likeChallenge, unlikeChallenge } from "@/services/challenges.service";
import "./Like.scss";
import useToasts from "@/hooks/useToasts";

export interface ILike {
  id: number;
  isAlreadyLiked?: boolean;
  likesCount?: number;
  showNumber: boolean;
}

export default function Like({ id, isAlreadyLiked, likesCount = 0, showNumber }: ILike) {
  const [isLiked, setIsLiked] = useState(isAlreadyLiked);
  const [count, setCount] = useState(likesCount);
  const { mutate: like } = useMutation(likeChallenge);
  const { mutate: unlike } = useMutation(unlikeChallenge);
  const { isConnected } = useContext(AuthContext);
  const { pushToast } = useToasts();

  const handleLike = useCallback(() => {
    isLiked ? unlike(id) : like(id);
    setIsLiked(!isLiked);
    setCount((prev) => (!isLiked ? prev + 1 : prev - 1));
  }, [isLiked]);

  return (
    <div
      className={`like like--${isLiked}`}
      onClick={() => {
        isConnected()
          ? handleLike()
          : pushToast({
              theme: "secondary",
              title: "Vous devez être connecter",
              desc: "vous devez etre connecter pour liker un challenge"
            });
      }}>
      <Svg id="like" />
      {showNumber && <p className="like__count">{count}</p>}
    </div>
  );
}
