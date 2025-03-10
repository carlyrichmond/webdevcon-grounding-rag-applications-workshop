
import logo from '../../../public/logo.svg'
import Image from "next/image";

import Link from 'next/link';

export default function Nav() {
    return (
        <div className="nav-fixed">
            <Link href="/">
                <Image
                    className="nav__logo"
                    src={logo}
                    alt=""
                />
            </Link>
        </div>
    );
}
