import React from "react";
import ReactLoading, { LoadingProps as ReactLoadingProps, LoadingType } from "react-loading";

interface LoadingProps extends ReactLoadingProps {
    type: LoadingType | undefined;
}

const Loading: React.FC<LoadingProps> = ({ type, color, ...rest }) => (
  <ReactLoading type={type} color={color} {...rest} />
);

export default Loading;