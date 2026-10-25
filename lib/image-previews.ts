import type { StaticImageData } from "next/image";
import heroTablet from "@/public/images/hero-tablet.webp";
import heroColors from "@/public/images/hero-colors.webp";
import heroCamera from "@/public/images/hero-camera.webp";
import oldTown from "@/public/images/old-town-challenge.webp";
import tabletHuddle from "@/public/images/tablet-race-huddle.webp";
import tabletCheckpoint from "@/public/images/tablet-race-checkpoint.webp";
import movieAwards from "@/public/images/movie-making-awards.webp";
import movieWorkshop from "@/public/images/movie-making-workshop.webp";
import movieSelfie from "@/public/images/movie-making-selfie.webp";

// Static imports let Next generate tiny inline previews at build time.
export const imagePreviews: Partial<Record<string, StaticImageData>> = {
  "/images/hero-tablet.webp": heroTablet,
  "/images/hero-colors.webp": heroColors,
  "/images/hero-camera.webp": heroCamera,
  "/images/old-town-challenge.webp": oldTown,
  "/images/tablet-race-huddle.webp": tabletHuddle,
  "/images/tablet-race-checkpoint.webp": tabletCheckpoint,
  "/images/movie-making-awards.webp": movieAwards,
  "/images/movie-making-workshop.webp": movieWorkshop,
  "/images/movie-making-selfie.webp": movieSelfie,
};
