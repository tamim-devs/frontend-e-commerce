import React from "react";
import { ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#172b22] text-[#fffaf0]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-black tracking-tight">
              Pure
              <span className="text-[#e5ae2f]">Nature</span>
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-7 text-[#c8d0c7]">
              Pure honey, fresh khati cow milk, and quality
              fishery products — naturally sourced for your
              family.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff12] text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#e5ae2f] hover:text-[#172b22]"
              >
                f
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff12] text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#e5ae2f] hover:text-[#172b22]"
              >
                ig
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff12] text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#e5ae2f] hover:text-[#172b22]"
              >
                X
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff12] text-sm font-bold transition duration-300 hover:-translate-y-1 hover:bg-[#e5ae2f] hover:text-[#172b22]"
              >
                yt
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="relative inline-block text-base font-bold">
              Quick Links

              <span className="absolute -bottom-2 left-0 h-0.5 w-8 rounded-full bg-[#e5ae2f]" />
            </h3>

            <ul className="mt-7 space-y-3 text-sm text-[#c8d0c7]">
              <li>
                <a
                  href="/"
                  className="transition hover:pl-1 hover:text-[#e5ae2f]"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#products"
                  className="transition hover:pl-1 hover:text-[#e5ae2f]"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition hover:pl-1 hover:text-[#e5ae2f]"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="transition hover:pl-1 hover:text-[#e5ae2f]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="relative inline-block text-base font-bold">
              Our Products

              <span className="absolute -bottom-2 left-0 h-0.5 w-8 rounded-full bg-[#e5ae2f]" />
            </h3>

            <ul className="mt-7 space-y-3 text-sm text-[#c8d0c7]">
              <li>
                <a
                  href="#"
                  className="transition hover:pl-1 hover:text-[#e5ae2f]"
                >
                  Pure Honey
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:pl-1 hover:text-[#f5f0df]"
                >
                  Khati Cow Milk
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:pl-1 hover:text-[#6fc4ad]"
                >
                  Fresh Fish
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:pl-1 hover:text-[#6fc4ad]"
                >
                  Fishery Products
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="relative inline-block text-base font-bold">
              Stay Connected

              <span className="absolute -bottom-2 left-0 h-0.5 w-8 rounded-full bg-[#e5ae2f]" />
            </h3>

            <p className="mt-7 text-sm leading-6 text-[#c8d0c7]">
              Stay updated with our fresh products, new
              arrivals, and special offers.
            </p>

            <div className="mt-5 flex overflow-hidden rounded-full border border-[#ffffff1a] bg-[#ffffff0d] p-1 transition focus-within:border-[#e5ae2f]">
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-[#8e9b91]"
              />

              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5ae2f] text-[#172b22] transition duration-300 hover:bg-[#f3c94d]">
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-[#ffffff12] pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-[#9eaaa1] sm:flex-row sm:text-left">
            <p>
              © {new Date().getFullYear()} PureNature. All
              rights reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="transition hover:text-[#e5ae2f]"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition hover:text-[#e5ae2f]"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;