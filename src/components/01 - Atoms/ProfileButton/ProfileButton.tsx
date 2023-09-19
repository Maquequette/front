import { CSSProperties, memo } from "react";
import KateProfile from "../../../assets/images/kate_profile.png";
import "./ProfileButton.scss";

export interface IProfileBtn {
    id: number;
    username: string;
    picture?: string;
    styles?: CSSProperties;
}

export default memo(function ProfileButton({ id, username, picture, styles }: IProfileBtn) {

    return (
        <div className="profileBtn">
            <span>{username}</span>
            <div className="profileBtn__picture">
                <img src={picture ? picture : KateProfile} alt={username} />
            </div>
        </div>
    );
});