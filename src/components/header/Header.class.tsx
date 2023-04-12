import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.svg";
import { Layout, Input, Menu, Button, Dropdown, Tooltip } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import Typography from "antd/es/typography";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { withRouter, RouterComponentProps } from "../../helpers/withRouter";
import { RootState } from "../../redux/store";
import { LanguageState } from "../../redux/language/languageReducer";
import { WithTranslation, withTranslation } from "react-i18next";
import { changeLanguageActionCreator } from "../../redux/language/languageActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.language.languageList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    },
    // addLanguage: (name: string, code: string) => {
    //   const action = addLanguageActionCreator(name, code);
    //   dispatch(action);
    // },
  };
};

type PropsType = RouterComponentProps &
  WithTranslation &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
class HeaderComponent extends React.Component<PropsType> {
  // constructor(props) {
  //   super(props);
  //   const storeState = store.getState();

  //   this.state = {
  //     language: storeState.language,
  //     languageList: storeState.languageList,
  //   };

  //   store.subscribe(() => {
  //     const storeState = store.getState();
  //     this.setState({
  //       language: storeState.language,
  //     });
  //   });
  // }

  menuClickHandler = (e) => {
    console.log(e);
    if (e.key === "new") {
      // const action = {
      //   type: "change_language",
      //   payload: { code: "new_lang", name: "新语言" },
      // };
      // store.dispatch(action);
    } else {
      this.props.changeLanguage(e.key);
    }
  };
  render() {
    const { navigate, t } = this.props;

    return (
      <div className={styles["app-header"]}>
        <div className={styles["top-header"]}>
          <div className={styles.inner}>
            {/* <Typography.Text>Travel makes happy life</Typography.Text> */}

            <Dropdown.Button
              overlay={
                <Menu onClick={this.menuClickHandler}>
                  {this.props.languageList.map((l) => {
                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                  })}
                </Menu>
              }
              icon={<GlobalOutlined />}
            >
              {/* {this.props.language === "zh" ? "en" : "English"} */}
            </Dropdown.Button>

            {/* <Dropdown.Button  placement="top" icon={<GlobalOutlined />}>
      Dropdown
    </Dropdown.Button> */}
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => navigate("/register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => navigate("/signin")}>
                {" "}
                {t("header.signin")}
              </Button>
            </Button.Group>
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
  }
}

export const Header = connect(mapStateToProps)(
  withTranslation()(withRouter(HeaderComponent))
);
