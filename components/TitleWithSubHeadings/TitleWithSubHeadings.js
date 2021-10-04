import React, { FC } from "react";
import s from "./TitleWithSubHeadings.module.css";
import { Typography } from "@codat/orchard-ui";

export const TitleWithSubHeadings = ({
  mainTitle,
  upperTitle,
  lowerTitle,
  mainTitleCustomFontSize,
  customPaddingBottom,
}) => {
  return (
    <div className={s.container} style={{ paddingBottom: customPaddingBottom }}>
      {upperTitle && (
        <Typography
          variant="small"
          className={s.smallText}
          style={{ margin: "0 0 8px 0" }}
        >
          {upperTitle}
        </Typography>
      )}
      <Typography
        variant="h1"
        className={s.largeText}
        style={{
          fontSize: mainTitleCustomFontSize,
          margin: 0,
        }}
      >
        {mainTitle}
      </Typography>
      {lowerTitle && (
        <Typography
          variant="small"
          className={s.smallText}
          style={{ margin: "8px 0 0 0" }}
        >
          {lowerTitle}
        </Typography>
      )}
    </div>
  );
};
