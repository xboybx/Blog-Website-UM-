// src/lib/randomImage.ts

const images = [
  "https://img.freepik.com/premium-vector/hand-drawn-collage-illustration_23-2151956010.jpg?semt=ais_hybrid&w=740",
  "https://img.freepik.com/premium-vector/young-african-american-man-illustration_10083-1010.jpg?semt=ais_hybrid&w=740",
  "https://img.freepik.com/premium-vector/vector-portrait-young-man-sweater-gloves-autumn-outfit-attractive-fashionable-model_419911-875.jpg?semt=ais_items_boosted&w=740",
  "https://img.freepik.com/premium-vector/avatar-happy-man-with-tattoo-earring-modern-pyramid-style-moustache-square-portrait-person-user-profile-male-face-with-mustache-side-view-flat-isolated-vector-illustration_633472-7362.jpg?semt=ais_hybrid&w=740",
  "https://img.freepik.com/premium-vector/avatar-young-person-cartoon-style-whimsical-cartoon-design-feature-teenagers-avatar_198565-9412.jpg?semt=ais_hybrid&w=740"
];

export function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}
