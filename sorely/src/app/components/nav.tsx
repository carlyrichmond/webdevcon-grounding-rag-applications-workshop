
import Link from 'next/link';
import Image from 'next/image';

import logo from '../../../public/globe.svg'

export default function Nav() {
    return (
        <div className="nav__fixed">
            <Link href="/">
                <Image
                    className="nav__logo"
                    src={logo}
                    width={50}
                    alt=""
                />
            </Link>
            <h1>Travel Planner</h1>
        </div>
    );
}
