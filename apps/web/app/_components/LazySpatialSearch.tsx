import dynamic from "next/dynamic";
import { HeroSceneSkeleton } from "./HeroSceneSkeleton";

const SpatialSearchShowcase = dynamic(() => import("./SpatialSearchShowcase"), {
  loading: () => <HeroSceneSkeleton />,
});

export function LazySpatialSearch() {
  return <SpatialSearchShowcase />;
}
