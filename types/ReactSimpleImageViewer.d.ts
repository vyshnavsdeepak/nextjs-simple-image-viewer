import React, { CSSProperties } from "react";
interface IProps {
    src: string[];
    currentIndex?: number;
    backgroundStyle?: CSSProperties;
    disableScroll?: boolean;
    closeOnClickOutside?: boolean;
    onClose?: () => void;
    closeComponent?: JSX.Element;
    leftArrowComponent?: JSX.Element;
    rightArrowComponent?: JSX.Element;
}
declare const ReactSimpleImageViewer: (props: IProps) => React.JSX.Element;
export default ReactSimpleImageViewer;
