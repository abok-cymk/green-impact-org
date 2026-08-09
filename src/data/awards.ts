export interface Award {
  id: string
  orgName: string
  logoLink?: string
  logoSrc: string
  title: string
  description: string
  images: string[]
}

export const awards: Award[] = [
  {
    id: "cavu",
    orgName: "CAVU Africa",
    logoLink:
      "https://cavu.org/opening-the-2026-cavu-student-showcase-with-our-honorable-mentions/",
    logoSrc: "images/cavu.png",
    title: "International Honourable Mention",
    description:
      "Under Climate Innovation Challenge. In recognition of our exceptional project, 'Green Impact Innovators - Climate and Environmental Action,' presented at the Annual Eagles' Den in Kisumu.",
    images: [
      "images/cavu-tfk-training.webp",
      "images/cavu-tfk-assessment.webp",
      "images/cavu-04.webp",
      "images/cavu-03.webp",
      "images/cavu-02.webp",
      "images/cavu-01.webp",
      "images/award-cavu-tfk.webp",
      "images/cavu-leaders-museum.webp",
      "images/cavu-certs-holdings.webp"
    ],
  },
  {
    id: "pgs",
    orgName: "Project Green Schools",
    logoLink: "https://projectgreenschools.org/greendifferenceawards/",
    logoSrc: "images/green-difference.png",
    title: "Green Difference Award Winner",
    description:
      "Under climate education and action. Recognized for outstanding achievement and exemplary leadership in environmental sustainability at St. Mary's Nyalenda Comprehensive School.",
    images: [
      "images/gda.webp",
      "images/gda-school-initiative-01.webp",
      "images/gda-school-initiative-03.webp",
      "images/gda-school-initiative-02.webp"
    ],
  },
  {
    id: "tfk",
    orgName: "Teach for Kenya",
    // logoLink: "https://projectgreenschools.org/greendifferenceawards/",
    logoSrc: "images/teach-for-kenya-logo.png",
    title: "Annual Eagles' Den",
    description:
      "In recognition of your exceptional project, 'Green Impact Innovators' - Climate and Environmental Action, we proudly award you this certificate following your presentation at the Annual Eagles' Den, held on 27th March 2026 at Kisumu Hotel.",
    images: ["images/tfk-02.webp", "images/tfk-01.webp"],
  },
]
