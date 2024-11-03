import React from "react";
import Featured from "../components/featured/Featured";
import PropertyList from "../components/propertyList/PropertyList";
import FeaturedProperties from "../components/featuredProperties/FeaturedProperties";
import MailList from "../components/mailList/MailList";

export default function Home() {
  return (
    <div className="home w-full min-h-full flex flex-col gap-y-4 pt-[500px] pb-32">
      <Featured />
      <h1 className="homeTitle text-2xl font-bold">Browse by property type</h1>
      <PropertyList />
      <h1 className="homeTitle text-2xl font-bold">Featured Properties</h1>
      <FeaturedProperties />
      {/* <MailList /> */}
    </div>
  );
}
