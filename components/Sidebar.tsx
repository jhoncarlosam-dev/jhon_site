"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import { resume } from "@/data/resume";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -40% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    resume.nav.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between bg-navy px-4 py-3 shadow-md lg:hidden">
        <a
          href="#inicio"
          className="font-display text-lg font-bold uppercase tracking-[0.16em] text-white"
        >
          {resume.fullName}
        </a>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>
      </header>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy-deep/50 lg:hidden"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        />
      ) : null}

      <nav
        id="sideNav"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-navy px-6 py-10 text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Principal"
      >
        <a
          href="#inicio"
          onClick={closeMenu}
          className="mb-6 hidden self-center lg:block"
        >
          <Image
            src={resume.profileImage}
            alt={resume.fullName}
            width={160}
            height={160}
            priority
            className="h-36 w-36 rounded-full border-4 border-white/20 object-cover"
          />
        </a>
        <p className="font-display mb-1 hidden text-center text-2xl font-bold uppercase tracking-[0.18em] lg:block">
          {resume.name} <span className="text-[#a8dadc]">{resume.lastName}</span>
        </p>
        <p className="mb-8 hidden text-center text-xs uppercase tracking-[0.14em] text-white/60 lg:block">
          Fullstack freelance
        </p>
        <ul className="flex w-full flex-col gap-1">
          {resume.nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  className={`block rounded-md px-3 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href={resume.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          <FaWhatsapp />
          Pedir una cotización
        </a>
      </nav>
    </>
  );
}
