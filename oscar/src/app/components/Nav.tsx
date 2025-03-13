
import logo from '../../../public/logo.svg'
import Image from "next/image";

export default function Nav() {
    return (
        <div className="nav-fixed">
            <a href="/">
                <Image
                    className="nav__logo"
                    src={logo}
                    alt=""
                />
            </a>
        </div>
    );
}
