import { wagmiConfig } from "@/utils/wagmi";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { baseSepolia } from "wagmi/chains";
import { FC, ReactNode } from "react";
import { ONCHAINKIT_API_KEY } from "@/env";

const queryClient = new QueryClient();

interface IProps {
  children: ReactNode;
}

const OnchainProviders: FC<IProps> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={ONCHAINKIT_API_KEY} chain={baseSepolia}>
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default OnchainProviders;
