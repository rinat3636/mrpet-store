import Image from 'next/image';
import { ReactNode } from 'react';

export function SectionWithImage({
  image,
  alt,
  children,
  reverse = false,
  bg = 'bg-white',
  contain = true,
}: {
  image: string;
  alt: string;
  children: ReactNode;
  reverse?: boolean;
  bg?: string;
  contain?: boolean;
}) {
  return (
    <section className={`section ${bg}`}>
      <div className="container-site">
        <div className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
              <Image src={image} alt={alt} fill className={contain ? 'object-contain p-4' : 'object-cover'} />
            </div>
          </div>
          <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>{children}</div>
        </div>
      </div>
    </section>
  );
}
