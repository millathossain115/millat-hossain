import Image from 'next/image';
import profileImg from '../../assets/Image/about-profile.webp';
import SOCIAL_LINKS from './contactLinks';

export default function ContactProfileCard() {
  return (
    <aside className="contact-profile-card relative mx-auto w-full max-w-[20rem] overflow-hidden rounded-[1.75rem] border border-[#DC143C]/45 bg-[linear-gradient(180deg,rgba(40,11,11,0.92),rgba(26,10,10,0.9))] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.45)] sm:p-6 md:max-w-2xl md:p-7 lg:max-w-[20rem] lg:p-6">
      <div className="absolute -left-12 -top-14 h-40 w-40 rounded-full border-4 border-dashed border-[#ff4d73]/60" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full border-4 border-dashed border-[#ff4d73]/60" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(220,20,60,0.08),transparent_32%,rgba(255,255,255,0.02)_100%)]" />

      <div className="relative flex h-full flex-col md:flex-row md:items-center md:gap-8 lg:flex-col lg:items-stretch lg:gap-0">
        <div className="group relative mx-auto mb-5 w-full max-w-[14rem] shrink-0 overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0b0b0b] md:mb-0 md:max-w-[13rem] lg:mb-5 lg:max-w-[14rem]">
          <Image
            src={profileImg}
            alt="Millat Hossain"
            width={960}
            height={1280}
            placeholder="blur"
            className="relative aspect-[4/5.2] w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center text-center md:text-left lg:text-center">
          <div className="mb-3 md:mb-2 lg:mb-6">
            <p className="mx-auto max-w-[13rem] font-display text-[1.55rem] font-semibold leading-none text-[#DC143C] sm:max-w-[14rem] sm:text-[1.8rem] md:mx-0 md:max-w-none md:text-[2rem] lg:mx-auto lg:max-w-[14rem] lg:text-[1.8rem]">
              Millat Hossain
            </p>
          </div>

          <p className="mx-auto max-w-[13rem] text-base font-medium leading-[1.2] text-slate-200/88 sm:max-w-[14rem] sm:text-[1.45rem] sm:leading-[1.06] md:mx-0 md:max-w-none md:text-[1.25rem] md:leading-snug lg:mx-auto lg:max-w-[14rem] lg:text-[1.45rem] lg:leading-[1.06]">
            A software engineer focused on building clean, high-impact digital
            experiences.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 pt-2 md:mt-5 md:justify-start md:pt-0 lg:mt-auto lg:justify-center lg:pt-8">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ff4d73]/40 bg-black/10 text-lg text-[#ff4d73] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff819c] hover:text-white hover:shadow-[0_12px_30px_rgba(220,20,60,0.24)]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
