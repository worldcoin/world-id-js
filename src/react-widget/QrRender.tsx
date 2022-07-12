import { WorldcoinLogomark } from "assets/logos";
import { renderToString } from "react-dom/server";
import QRCodeStyling from "qr-code-styling";
import { styled } from "@stitches/react";
import { useEffect, useRef } from "react";

const logoB64 = window.btoa(renderToString(<WorldcoinLogomark />));

const qrCode = new QRCodeStyling({
  width: 183,
  height: 183,
  type: "svg",
  image: `data:image/svg+xml;base64,${logoB64}`,
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  cornersDotOptions: {
    type: "dot",
  },
  dotsOptions: {
    color: "var(--qr-color)",
    type: "extra-rounded",
  },
  backgroundOptions: {
    color: "transparent",
  },
  imageOptions: {
    margin: 4,
    hideBackgroundDots: true,
  },
});

const QrContainer = styled("div", {
  position: "relative",
  zIndex: "0",
  display: "flex",
  width: "198px",
  height: "198px",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid var(--qr-container-color)",
  borderRadius: "2px",
  "&::before, &::after": {
    content: "",
    display: "block",
    position: "absolute",
    zIndex: " -1",
    background: "var(--bg)",
  },
  "&::before": {
    top: "24px",
    bottom: "24px",
    left: "-1px",
    right: "-1px",
  },
  "&::after": {
    top: "-1px",
    bottom: "-1px",
    left: "24px",
    right: "24px",
  },
  "& > *": {
    position: "relative",
  },
});

interface QRRenderInterface {
  data: string;
}

export const QrRender = ({ data }: QRRenderInterface): JSX.Element => {
  const qrContainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!qrContainRef.current) {
      return;
    }

    qrContainRef?.current && qrCode.append(qrContainRef.current);
  }, []);

  useEffect(() => {
    qrCode.update({ data });
  }, [data]);
  return <QrContainer ref={qrContainRef} />;
};
