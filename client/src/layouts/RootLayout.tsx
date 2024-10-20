import { FC, ReactNode } from "react";

interface IProps {
	children: ReactNode;
}

const RootLayout: FC<IProps> = ({ children }) => {
	return <div className="antugrow min-h-screen bg-gray-100 font-nunito antialiased transition-colors duration-200 ease-in-out">{children}</div>;
};

export default RootLayout;
