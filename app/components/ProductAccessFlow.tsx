"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ProductChoiceModal = dynamic(() => import("./ProductChoiceModal"), { ssr: false });
const ManagerAccessModal = dynamic(() => import("./ManagerAccessModal"), { ssr: false });
const PlayerAccessModal = dynamic(() => import("./PlayerAccessModal"), { ssr: false });

type Props = {
  title: string;
  onClose: () => void;
};

export default function ProductAccessFlow({ title, onClose }: Props) {
  const [product, setProduct] = useState<"manager" | "player" | null>(null);

  if (product === "manager") {
    return (
      <ManagerAccessModal
        onClose={onClose}
        adminUrl="https://admin.sportme.ro/auth"
        managerPlayStoreUrl="https://play.google.com/store/apps/details?id=com.sportme.dashboard"
      />
    );
  }

  if (product === "player") {
    return (
      <PlayerAccessModal
        onClose={onClose}
        playerWebUrl="https://app.sportme.ro/app"
        playerPlayStoreUrl="https://play.google.com/store/apps/details?id=ro.sportme.app"
      />
    );
  }

  return <ProductChoiceModal mode="signIn" title={title} onClose={onClose} onSelect={setProduct} />;
}
