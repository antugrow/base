import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import AcmeLogo from "./AcmeLogo";
import WalletConnection from "../web3/WalletConnection";

export default function HomeNavbar() {
	return (
		<Navbar>
			<NavbarContent>
				<NavbarBrand>
					<AcmeLogo />
					<p className="font-bold text-inherit">Antugrow</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem>
					<Link color="foreground" href="#">
						Farmers
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link href="/portfolio" aria-current="page">
						Portfolio
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link color="foreground" href="#">
						Integrations
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem>
					<WalletConnection />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
