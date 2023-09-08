import { useContext, useMemo, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import useClickOutside from "@/hooks/useClickOutside";
import Container from "@/components/01 - Atoms/Container/Container";
import Paragraph from "@/components/01 - Atoms/Paragraph/Paragraph";
import Heading from "@/components/01 - Atoms/Heading/Heading";
import Grid from "@/components/02 - Molecules/Grid/Grid";
import Card from "@/components/03 - Organisms/Card/Card";
import "./Profil.scss";

export default function Profil() {
  const { user, setUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [editedInfo, setEditedInfo] = useState(-1);
  const [newInfo, setNewInfo] = useState("");
  const ref = useClickOutside(() => setEditedInfo(-1));

  const userInfo = useMemo(() => {
    return [
      {
        key: "lastName",
        label: t("Last Name"),
        value: user.lastName
      },
      {
        key: "firstName",
        label: t("First Name"),
        value: user.firstName
      },
      {
        key: "email",
        label: t("Email"),
        value: user.email
      }
    ];
  }, [user]);

  const handleEditing = (index: number) => {
    if (index === editedInfo) {
      setEditedInfo(-1);
    } else {
      setEditedInfo(index);
      setNewInfo(userInfo[index].value);
    }
  };

  const handleSubmit = (key: string) => {
    setUser({ ...user, [key]: newInfo });
  };

  return (
    <div className="profil">
      <Container isLarge={false} center={true}>
        <Heading tag="h1" level="primary">
          {t("Page Profil")}
        </Heading>
        <div className="profil__container">
          <div className="profil__card" ref={ref}>
            {userInfo.map((info, index) => {
              const isEdited = index === editedInfo;
              return (
                <div
                  className="profil__info"
                  onDoubleClick={() => {
                    handleEditing(index);
                  }}>
                  <Paragraph>
                    <b>{info.label} : </b>
                    {!isEdited && info.value}
                  </Paragraph>
                  {isEdited && (
                    <input
                      type="text"
                      value={newInfo}
                      onInput={(e: any) => {
                        setNewInfo(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setEditedInfo(-1);
                          handleSubmit(info.key);
                        }
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="profil__content">
            <div className="profil__challenges">
              <Heading tag="h3" level="tertiary">
                {t("Liked Challenges")}
              </Heading>
              {/* <Grid size="20rem"></Grid> */}
            </div>
            <div className="profil__challenges">
              <Heading tag="h3" level="tertiary">
                {t("Challenges you made")}
              </Heading>
              {/* <Grid size="20rem"></Grid> */}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
