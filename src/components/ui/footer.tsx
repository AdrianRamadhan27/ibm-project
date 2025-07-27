import { FaFacebook, FaInstagram, FaXTwitter, FaLinkedin } from 'react-icons/fa6';
const socials = [
  { icon: <FaFacebook />, title: "Facebook", from: "#3b5998", to: "#8b9dc3", link: "https://www.facebook.com/adrian.ramadhan.14" },
  { icon: <FaInstagram />, title: "Instagram", from: "#f09433", to: "#e6683c", link: "https://www.instagram.com/adrian_voiz/" },
  { icon: <FaXTwitter />, title: "Twitter", from: "#56CCF2", to: "#2F80ED", link: "https://x.com/CrackVoiz" },
  { icon: <FaLinkedin />, title: "LinkedIn", from: "#0077b5", to: "#00c6ff", link: "https://www.linkedin.com/in/adrian-voiz/" },
];

export default function Footer() {
  return (
    <footer className="py-4 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <ul className="flex justify-center gap-6 flex-wrap">
          {socials.map((item, idx) => (
            <li
              key={idx} 
              style={{
                "--from": item.from,
                "--to": item.to,
              } as React.CSSProperties}
            >
              <a href={item.link} target="_blank" className="relative w-[60px] h-[60px] rounded-full bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] cursor-pointer flex justify-center items-center transition-all duration-500 hover:w-[180px] group">
                {/* Glow Shadow */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 z-0" style={{
                  background: `linear-gradient(45deg, ${item.from}, ${item.to})`,
                }} />
                <div className="absolute top-2 w-full h-full rounded-full z-[-1] blur-[15px] opacity-0 group-hover:opacity-50 transition duration-500" style={{
                  background: `linear-gradient(45deg, ${item.from}, ${item.to})`,
                }} />
                {/* Icon */}
                <span className="text-gray-500 text-xl z-10 transition-all duration-500 group-hover:scale-0">
                  {item.icon}
                </span>
                {/* Title */}
                <span className="absolute text-white text-sm uppercase tracking-wide scale-0 group-hover:scale-100 transition-all duration-500 delay-200 z-10">
                  {item.title}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-center text-gray-600 text-md mt-6">© 2025 SuaraHati. All rights reserved.</p>
      </div>
    </footer>
  );
}
