import Image from 'next/image';
import Link from 'next/link'

import pin from '../../../public/world-pin.svg';

type FCDOGuidanceProps = {
  status: string,
  url: string
}

function getFormattedStatus(status: string): string {
  if (status.includes("avoid all travel")) {
    return `❗ ${status}`;
  } else if (status.includes("avoid all but essential")) {
    return `⚠️ ${status}`;
  } else {
    return `✅ No warnings`;
  }
}

export const FCDOGuidance = (props: FCDOGuidanceProps) => {
  const status: string = getFormattedStatus(props.status);
  return (
    <div className="fcdo__summary__container">
      <h3>FCDO Guidance</h3>
      <p className="fcdo__status_p">{status}</p>
      {props.url ? <Link href={props.url} className="map__link" target="_blank">
      <Image src={pin} width={25} height={25} alt=""/>
      See areas </Link> : ''}
    </div>
  );
};
