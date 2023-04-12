import React, { useTransition, useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Input, Menu, Button, Dropdown, Tooltip } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { Dispatch } from "redux";
import {
  LanguageActionTypes,
  changeLanguageActionCreator,
} from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { StringMappingType } from "typescript";
import { UserSlice } from "../../redux/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);
  const dispatch = useDispatch();
  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();
  const { t } = useTranslation();

  const jwt = useSelector((s) => s.user.token);
  const [username, setUsername] = useState("");

  const shoppingCartItems = useSelector((s) => s.shoppingCart.items);
  const shoppingCartLoading = useSelector((s) => s.shoppingCart.loading);

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt);
      setUsername(token.username);
    }
  }, [jwt]);

  const menuClickHandler = (e) => {
    console.log(e);
    if (e.key === "new") {
      // const action = {
      //   type: "change_language",
      //   payload: { code: "new_lang", name: "新语言" },
      // };
      // store.dispatch(action);
    } else {
      // changeLanguage(e.key);
      dispatch(changeLanguageActionCreator(e.key));
    }
  };

  const onLogout = () => {
    dispatch(UserSlice.actions.logOut());
    navigate("/");
  };

  return (
    <div className={styles["app-header"]}>
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          {/* <Typography.Text>Travel makes happy life</Typography.Text> */}
          <Dropdown.Button
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => {
                  return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                })}
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === "zh" ? "en" : "English"}
          </Dropdown.Button>
          {/* <Dropdown.Button placement="top" icon={<GlobalOutlined />}>
            Dropdown
          </Dropdown.Button> */}
          {jwt ? (
            <Button.Group
              style={{ marginBottom: 10 }}
              className={styles["button-group"]}
            >
              <span style={{ marginRight: 10 }}>
                {t("header.welcome")}
                <Typography.Text strong style={{ marginRight: 5 }}>
                  ,{username}
                </Typography.Text>
              </span>
              <Button
                loading={shoppingCartLoading}
                onClick={() => navigate("/shoppingCart")}
              >
                {t("header.shoppingCart")}({shoppingCartItems.length})
              </Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group
              style={{ marginBottom: 10 }}
              className={styles["button-group"]}
            >
              <Button onClick={() => navigate("/register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => navigate("/signin")}>
                {" "}
                {t("header.signin")}
              </Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>

        <Input.Search
          placeholder={"please input destination or keywords"}
          className={styles["search-input"]}
          onSearch={(keyword) => {
            navigate("/search/" + keyword);
          }}
        />
      </Layout.Header>
      <Menu mode={"horizontal"} className={styles["main-menu"]}>
        <Menu.Item key="1">{t("header.home_page")}</Menu.Item>
        <Menu.Item key="2">{t("header.weekend")}</Menu.Item>
        <Menu.Item key="3">{t("header.group")}</Menu.Item>
        <Menu.Item key="4">{t("header.backpack")}</Menu.Item>
        <Menu.Item key="5">{t("header.private")}</Menu.Item>
        <Menu.Item key="6">{t("header.cruise")}</Menu.Item>
        <Menu.Item key="7">{t("header.hotel")}</Menu.Item>
        <Menu.Item key="8">{t("header.local")}</Menu.Item>
        <Menu.Item key="9">{t("header.theme")}</Menu.Item>
        <Menu.Item key="10">{t("header.custom")}</Menu.Item>
        <Menu.Item key="11">{t("header.study")}</Menu.Item>
        <Menu.Item key="12">{t("header.visa")}</Menu.Item>
        <Menu.Item key="13">{t("header.enterprise")}</Menu.Item>
        <Menu.Item key="14">{t("header.high_end")}</Menu.Item>
        <Menu.Item key="15">{t("header.outdoor")}</Menu.Item>
        <Menu.Item key="16">{t("header.insurance")}</Menu.Item>
      </Menu>
    </div>
  );
};
