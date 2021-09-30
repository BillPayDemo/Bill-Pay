import React from "react";
import Image from "next/image";

export const TheodoLogo = () => {
  return (
    <Image
      src={
        "https://www.theodo.co.uk/hs-fs/hubfs/Theodo-2016/Images/theodo-logo-square_copy.png?width=400&name=theodo-logo-square_copy.png"
      }
      width={70}
      height={70}
      alt="Theodo logo"
    />
  );
};
