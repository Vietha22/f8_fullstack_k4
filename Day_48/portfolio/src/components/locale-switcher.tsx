"use client";

import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";

import { Button } from "@nextui-org/button";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const lang = pathName.split("/")[1] === "en" ? "vi" : "en";

  return (
    <Button
      as={Link}
      className="text-sm font-normal text-default-600 bg-default-100"
      href={`/${lang}/${pathName.split("/")[2] || ""}`}
      variant="flat"
    >
      {lang}
    </Button>
  );
}
