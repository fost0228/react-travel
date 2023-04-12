import React, { useState } from "react";
import { Layout } from "antd";
import { useTranslation, withTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      {t("footer.detail")}
    </Layout.Footer>
  );
};
