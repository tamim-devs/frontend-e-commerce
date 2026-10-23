import React from "react";
import {
  ShieldCheck,
  Leaf,
  BadgeCheck,
  Truck,
} from "lucide-react";

const Guarantee = () => {
  const guarantees = [
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description:
        "We carefully maintain the quality and purity of every product.",
    },
    {
      icon: Leaf,
      title: "Naturally Sourced",
      description:
        "Our honey, milk, and fish are sourced with care from trusted sources.",
    },
    {
      icon: BadgeCheck,
      title: "Fresh & Authentic",
      description:
        "Get fresh, authentic products that you can confidently trust.",
    },
    {
      icon: Truck,
      title: "Safe Delivery",
      description:
        "Your order is carefully packed and delivered fresh to your doorstep.",
    },
  ];

  return (
    <section className="bg-[#f8f5e9] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-[#e5ae2f]/15 px-4 py-2 text-sm font-semibold text-[#a87300]">
            Our Promise
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#25382d] sm:text-4xl lg:text-5xl">
            Our Guarantee to You
          </h2>

          <p className="mt-4 text-base leading-7 text-[#68756c] sm:text-lg">
            From natural sourcing to doorstep delivery, we focus on
            quality, freshness, and your trust.
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-[#e4dfcc] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5ae2f]/15 text-[#b77a00] transition duration-300 group-hover:bg-[#e5ae2f] group-hover:text-white">
                  <Icon size={30} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#25382d]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#68756c]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Guarantee;