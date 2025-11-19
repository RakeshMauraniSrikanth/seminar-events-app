export type Event = {
  title: string;
  image: string;
  location: string;
  date: string;
  slug: string;
  time: string; // 24h format local start time
};

export const events: Event[] = [
  {
    title: "React Conf 2025",
    image: "/images/event1.png",
    location: "Las Vegas, USA",
    date: "2025-12-02",
    slug: "react-conf-2025",
    time: "09:00"
  },
  {
    title: "AWS re:Invent 2025",
    image: "/images/event2.png",
    location: "Las Vegas, USA",
    date: "2025-12-01",
    slug: "aws-reinvent-2025",
    time: "08:30"
  },
  {
    title: "Google Cloud Next 2026",
    image: "/images/event3.png",
    location: "San Francisco, USA",
    date: "2026-04-07",
    slug: "google-cloud-next-2026",
    time: "09:00"
  },
  {
    title: "Microsoft Build 2026",
    image: "/images/event4.png",
    location: "Seattle, USA",
    date: "2026-05-19",
    slug: "microsoft-build-2026",
    time: "09:30"
  },
  {
    title: "WWDC 2026",
    image: "/images/event5.png",
    location: "Cupertino, USA",
    date: "2026-06-08",
    slug: "wwdc-2026",
    time: "10:00"
  },
  {
    title: "KubeCon + CloudNativeCon Europe 2026",
    image: "/images/event6.png",
    location: "Amsterdam, Netherlands",
    date: "2026-03-17",
    slug: "kubecon-europe-2026",
    time: "09:00"
  }
]