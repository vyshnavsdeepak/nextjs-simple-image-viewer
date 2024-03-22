import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image"

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

const NextSimpleImageViewer = (props: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex ?? 0);

  const changeImage = useCallback(
    (delta: number) => {
      let nextIndex = (currentIndex + delta) % props.src.length;
      if (nextIndex < 0) nextIndex = props.src.length - 1;
      setCurrentIndex(nextIndex);
    },
    [currentIndex, props.src]
  );

  const handleClick = useCallback(
    (event: any) => {
      if (!event.target || !props.closeOnClickOutside) {
        return;
      }

      const checkId = event.target.id === 'NextSimpleImageViewer';
      const checkClass = event.target.classList.contains('next-simple-image-viewer__slide');

      if (checkId || checkClass) {
        event.stopPropagation();
        props.onClose?.();
      }
    },
    [props.closeOnClickOutside, props.onClose]
  );

  const handleKeyDown = useCallback(
    (event: any) => {
      if (event.key === "Escape") {
        props.onClose?.();
      }

      if (["ArrowLeft", "h"].includes(event.key)) {
        changeImage(-1);
      }

      if (["ArrowRight", "l"].includes(event.key)) {
        changeImage(1);
      }
    },
    [changeImage, props.onClose]
  );

  const handleWheel = useCallback(
    (event: any) => {
      if (event.wheelDeltaY > 0) {
        changeImage(-1);
      } else {
        changeImage(1);
      }
    },
    [changeImage]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    if (!props.disableScroll) {
      document.addEventListener("wheel", handleWheel);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (!props.disableScroll) {
        document.removeEventListener("wheel", handleWheel);
      }
    };
  }, [handleKeyDown, handleWheel, props.disableScroll]);

  return (
    <div
      id="NextSimpleImageViewer"
      className={`${styles.wrapper} next-simple-image-viewer__modal`}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      style={props.backgroundStyle}
    >
      <span
        className={`${styles.close} next-simple-image-viewer__close`}
        onClick={() => props.onClose?.()}
      >
        { props.closeComponent || "×" }
      </span>

      {props.src.length > 1 && (
        <span
          className={`${styles.navigation} ${styles.prev} next-simple-image-viewer__previous`}
          onClick={() => changeImage(-1)}
        >
          { props.leftArrowComponent || "❮" }
        </span>
      )}

      {props.src.length > 1 && (
        <span
          className={`${styles.navigation} ${styles.next} next-simple-image-viewer__next`}
          onClick={() => changeImage(1)}
        >
          { props.rightArrowComponent || "❯" }
        </span>
      )}

      <div
        className={`${styles.content} next-simple-image-viewer__modal-content`}
        onClick={handleClick}
      >
        <div className={`${styles.slide} next-simple-image-viewer__slide`}>
          <Image src={props.src[currentIndex]} alt="" width={500} height={500} /> {/* Use Next.js Image component */}
        </div>
      </div>
    </div>
  );
};

export default NextSimpleImageViewer;