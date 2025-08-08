import HomeHeroPage from "@/modules/hokage/pages/HomeHero";
import { getHomeHero } from "@/modules/hokage/services/home.services";
import { notFound } from "next/navigation";
import React from "react";

const HomeHero = async () => {
    const result = await getHomeHero("");

    if (!result.success || !result.data) {
        notFound();
        return;
    }

    return <HomeHeroPage data={result?.data} />;
};

export default HomeHero;
