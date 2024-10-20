import { NextUIProvider } from "@nextui-org/react";
import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import RootLayout from "./RootLayout";
import OnchainProviders from "@/providers/OnchainProviders";

interface IProps {
  children: ReactNode;
}

const AppLayoutWrapper: FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <NextUIProvider navigate={navigate}>
      <RootLayout>
        <OnchainProviders>{children}</OnchainProviders>
      </RootLayout>
    </NextUIProvider>
  );
};

export default AppLayoutWrapper;
