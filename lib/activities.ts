import type { AddOn } from "@/components/AddOns";
import type { HeroPhoto } from "@/components/HeroShapes";

export type Scene = "oldtown" | "mountain" | "cellar";

export type Activity = {
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  duration: string;
  groupSize: string;
  setting: string;
  season: string;
  bestFor: string;
  scene: Scene;
  image?: {
    src: string;
    alt: string;
    // "cover": full-bleed hero with text on the open side. "framed": photo in a panel beside the text,
    // for images where the people sit in the middle and would be covered by the headline.
    layout: "cover" | "framed";
    // CSS object-position per context, so each photo can be cropped around its people.
    focus: { card: string; mobile: string; desktop: string };
  };
  // Up to three photos for the light hero with shaped frames. When set, it replaces the illustrated `image` hero.
  heroPhotos?: HeroPhoto[];
  // Photo for the activity cards only, when it should differ from the hero image on the activity page.
  cardImage?: { src: string; alt: string; focus: string };
  // Overrides for the search result title and description when the default would be too generic.
  seo?: { title: string; description: string; keywords: string[] };
  introHeading?: string;
  intro: string[];
  leaderNote: { heading: string; text: string };
  // Photo gallery and add-on cards replace the "included" and planning-notes lists.
  gallery?: { label: string; items: { src?: string; alt: string; objectPosition?: string }[] };
  addons?: { heading: string; subheading?: string; intro: string; items: AddOn[] };
  idealFor: string[];
  flow: { time: string; title: string; text: string }[];
  outcomes: { title: string; text: string }[];
  included: string[];
  logistics: string[];
  faq: { q: string; a: string }[];
};

// Placeholder content shared by the activity pages until each one gets its own text and photos.
const tabletRaceHeroPhotos: HeroPhoto[] = [
  {
    src: "/images/hero-tablet.webp",
    alt: "Colleagues solving a task together on a tablet in the Old Town",
    objectPosition: "45% 50%",
  },
  {
    src: "/images/tablet-race-huddle.webp",
    alt: "Teammates huddled around a tablet on a stone street, working out the next checkpoint",
    objectPosition: "55% 45%",
  },
  {
    src: "/images/tablet-race-checkpoint.webp",
    alt: "Two colleagues entering an answer on a tablet at a checkpoint while the rest of the team waits",
    objectPosition: "40% 40%",
  },
];

const makeAddons = (name: string): NonNullable<Activity["addons"]> => ({
  heading: "Enhance Your Experience (Optional Upgrades)",
  intro: `Want to scale up your corporate event? Customize your ${name} with these exclusive add-ons:`,
  items: [
    {
      icon: "task",
      title: "Custom tasks",
      text: "Company questions, values, product facts, an inside joke from the last quarter. We write them into the game, so the race talks about your business and not only about Sarajevo.",
      image: {
        src: "/images/custom-tasks-logo.webp",
        alt: "Team members forming a company logo with their bodies in front of Sarajevo's hillside",
      },
    },
    {
      icon: "drink",
      title: "Drink tasks",
      text: "Bosnian coffee, rakija, local wine, juices and teas. A tasting stop earns points, and every drink has a non-alcoholic alternative.",
      image: {
        src: "/images/addon-drink-tasks.webp",
        alt: "A team table at a tasting stop with cocktails, beer, a checklist and a map of the Old Town",
      },
    },
    {
      icon: "costume",
      title: "Costumed characters",
      text: "Hosts dressed as figures from the city's past, waiting at selected checkpoints with a task, a story or a trial for the team to pass.",
      image: {
        src: "/images/addon-costumed-characters.webp",
        alt: "Costumed hosts in medieval dress handing a team member an apple at a checkpoint",
      },
    },
    {
      icon: "game",
      title: "Extra games on route",
      text: "Short live games between checkpoints, chosen to suit your group: a relay, a team challenge or a surprise round that only the organiser knows about.",
      image: {
        src: "/images/addon-extra-games.webp",
        alt: "Colleagues playing a short team game with wooden sticks in an outdoor courtyard",
      },
    },
  ],
});

export const activities: Activity[] = [
  {
    slug: "sarajevo-tablet-race",
    title: "Sarajevo Tablet Race",
    eyebrow: "Tablet rally · Old Town · 1.5 – 3 hours",
    tagline:
      "24 checkpoints, live scoring and a clock that does not wait. Your delegates pick the route and race through the Old Town.",
    summary:
      "A tablet-guided city race through Sarajevo's Old Town. Teams choose their own route across 24 GPS checkpoints and collect points for quizzes, riddles and photo tasks.",
    duration: "1.5 – 3 hours",
    groupSize: "10 – 500 guests",
    setting: "Baščaršija, Ferhadija and the Old Town, on foot",
    season: "Year-round, with a written rain plan",
    bestFor: "Conference openers, kick-offs and incentive groups that need to mix before the agenda starts",
    scene: "oldtown",
    seo: {
      title: "Sarajevo Tablet Race: Corporate Team Building",
      description:
        "Tablet-guided city rally through Sarajevo's Old Town for 10 to 500 delegates. 24 GPS checkpoints, live scoring, custom tasks and a photo link.",
      keywords: [
        "tablet team building Sarajevo",
        "tablet race Sarajevo",
        "tablet rally Sarajevo",
        "city race Sarajevo",
        "corporate scavenger hunt Sarajevo",
        "team building Bosnia and Herzegovina",
        "conference team building Sarajevo",
        "GPS city game Sarajevo",
      ],
    },
    heroPhotos: tabletRaceHeroPhotos,
    cardImage: {
      src: "/images/hero-tablet.webp",
      alt: "Colleagues solving a task together on a tablet in the Old Town",
      focus: "45% 50%",
    },
    image: {
      src: "/images/old-town-quest-wide.webp",
      alt: "Four colleagues solving a riddle together on a tablet and paper map in front of the Sebilj fountain in Baščaršija",
      focus: { card: "85% 50%", mobile: "88% 50%", desktop: "75% 50%" },
      layout: "cover",
    },
    intro: [
      "Most delegates land in Sarajevo with a conference agenda and a vague plan to see Baščaršija. The Sarajevo Tablet Race lets them do the second without costing the first. In 1.5 to 3 hours, teams cross the Old Town armed with an interactive tablet, a digital map, and a countdown clock that waits for no one.",
      "When the race starts, all 24 checkpoints appear on the map at once. Nobody tells a team where to go first. They pick their own route, strategize, and live with the choice. Every checkpoint unlocks a location-based task: an engaging quiz, a local riddle, a photo challenge, or a video quest.",
      "The game is built in a dedicated team building app and fully customized for your group once the booking is confirmed. Your corporate questions, company logo, and industry in-jokes can be seamlessly integrated. While organizers track live scores on their own master screen, teams won't see the leaderboard until the very end—ensuring high motivation where nobody coasts and nobody gives up at checkpoint nine.",
    ],
    leaderNote: {
      heading: "Why organisers book it for the first day",
      text: "The first morning of a conference usually goes on small talk. A race gives people a shared job, so conversation starts in the first ten minutes and carries into the opening session. It also suits the people who dislike team building: nobody gives a speech, and because the tablet changes hands at every checkpoint, the loudest person cannot run the game alone.",
    },
    idealFor: [
      "Conference and congress openers for 10 to 500 delegates",
      "Sales kick-offs and incentive trips where offices need to mix",
      "International groups meeting in person for the first time",
    ],
    addons: makeAddons("Sarajevo Tablet Race"),

    flow: [
      {
        time: "15 – 20 min",
        title: "Briefing",
        text: "In a meeting room at your hotel or a venue nearby. Teams are formed, tablets handed out, and the Rally Hotline number is shown on every screen.",
      },
      {
        time: "Start",
        title: "All 24 checkpoints appear",
                text: "Every team is marked by its own colour. At the signal the full map opens and the clock starts.",
      },
      {
        time: "The race",
        title: "Teams choose their own route",
        text: "Quizzes, riddles, photo and video tasks, costumed stations and one bar stop. The tablet changes hands at every checkpoint.",
      },
      {
        time: "Finish",
        title: "Tablets handed in",
        text: "Teams return to the finish point and give back their tablets. Staff collect scores, photos and videos on the spot.",
      },
      {
        time: "After",
        title: "Results and medals",
        text: "Full results, including the host stations, reach you 10 to 15 minutes after the finish. Winners get their medals, and the photo and video link follows about two hours later.",
      },
    ],
    outcomes: [],
    included: [],
    logistics: [],
    gallery: {
      label: "Photos from the race",
      items: [
        { src: "/images/tablet-race-gallery-1.webp", alt: "A team gathered in a stone-paved square, one member raising an arm while holding a tablet", objectPosition: "50% 40%" },
        { src: "/images/tablet-race-gallery-2.webp", alt: "Colleagues with name badges crowding around a tablet to read the next task, with a team sign in the background", objectPosition: "50% 40%" },
        { src: "/images/tablet-race-gallery-3.webp", alt: "A team member entering an answer on the tablet while colleagues smile and watch", objectPosition: "40% 40%" },
        { src: "/images/tablet-race-gallery-4.webp", alt: "Teams gathered around a stone sphinx statue, reading their clue sheets in the Old Town", objectPosition: "50% 40%" },
        { src: "/images/tablet-race-gallery-5.webp", alt: "Five colleagues discussing their next move on a gravel path in a park", objectPosition: "50% 40%" },
        { src: "/images/tablet-race-gallery-6.webp", alt: "Two colleagues laughing as they solve a task on a tablet by the riverside", objectPosition: "50% 40%" },
        { src: "/images/tablet-race-gallery-7.webp", alt: "A team posing on stone steps pointing in different directions", objectPosition: "50% 40%" },
      ],
    },
    faq: [
      {
        q: "How is this different from a scavenger hunt or an Amazing Race-style game?",
        a: "It borrows the pace of the race and the puzzles of the hunt, then adds what those usually lack: staffed stations, live scoring, rotating roles and photo and video tasks handled for you. Nobody carries paper or downloads anything.",
      },
      {
        q: "How many people can take part?",
        a: "From 10 up to 500 delegates. We split larger groups into teams and stagger starts, adding staff as needed, so streets and stations never get crowded.",
      },
      {
        q: "Does anyone need to install an app?",
        a: "No. Each team gets a tablet with the game loaded. If a team gets stuck, the Rally Hotline number is on the screen.",
      },
      {
        q: "Can we add our own content?",
        a: "Yes. Company questions, values, product facts, a logo. Tell us what matters to the group and we write the tasks around it, then load them once the group is confirmed.",
      },
      {
        q: "Is it suitable for guests with limited mobility?",
        a: "Baščaršija is mostly flat, but the paving is uneven in places. Tell us early and we shorten the route, place the key checkpoints closer together and give the team an alternative role.",
      },
      {
        q: "What if it rains?",
        a: "We follow the forecast and agree the plan with you in writing beforehand: a later start, a shorter route with covered stops, or a new date.",
      },
    ],

  },
  {
    slug: "sarajevo-movie-making-challenge",
    title: "Sarajevo Movie Making Challenge",
    eyebrow: "Film workshop · Evening · 2 – 3 hours",
    tagline:
      "Scripts, storyboards, cameras and a premiere. Your teams become film crews in the region's film capital.",
    summary:
      "A creative film workshop in Sarajevo. Teams script, shoot and edit a short video tailored to your company, then premiere it at your evening event.",
    duration: "2 – 3 hours",
    groupSize: "10 – 500 guests",
    setting: "Central Sarajevo locations, with a screening at your event venue",
    season: "Year-round, with an indoor shooting plan",
    bestFor: "Evening events, gala dinners and groups that want a result they can watch together",
    scene: "mountain",
    cardImage: {
      src: "/images/hero-camera.webp",
      alt: "A colleague filming a teammate in a wig during a creative task",
      focus: "60% 40%",
    },
    image: {
      src: "/images/trebevic-expedition.webp",
      alt: "Four colleagues on a stone terrace above Sarajevo at sunset, one filming with a camera and one holding a clapperboard, with a team number sign and a sketched storyboard",
      focus: { card: "88% 50%", mobile: "90% 50%", desktop: "80% 50%" },
      layout: "cover",
    },
    intro: [
      "Most corporate team building activities end when the sun goes down. The **Sarajevo Movie Making Challenge** is designed to peak exactly when your evening event begins. This high-energy workshop transforms your conference itinerary into a full-scale cinematic production, using the historic and cultural backdrop of Sarajevo—the true film capital of the region—as your creative playground.",
      "The group breaks down into independent film crews. Before anyone shouts \"action,\" teams must collaborate to script, storyboard, and direct a concise short video. Whether the brief is a satirical company advertisement, a high-tempo music video, or a mockumentary about your industry, the content is fully tailored to your business goals and internal corporate culture.",
      "Running a successful crew requires strategic role delegation. Team members choose roles based on their individual strengths: from directors and producers managing the timeline, to camera operators handling the equipment, and actors stepping into the spotlight.",
    ],
    leaderNote: {
      heading: "An evening event with a built-in finale",
      text: "The films are screened together at your event, so the activity feeds straight into the evening. Everyone has something to watch, laugh at and talk about, and the room stays lively without a speech or a DJ. Because the crew needs every role filled, the quiet colleagues are as essential as the confident ones.",
    },
    idealFor: [
      "Evening events, gala dinners and award nights for 10 to 500 guests",
      "International groups who want a shared memory they can take home",
      "Creative, marketing and sales teams, or any group that likes to perform",
    ],
    heroPhotos: [
      {
        src: "/images/movie-making-awards.webp",
        alt: "Rows of golden Oscar-style statuettes lined up on a table before a gala awards ceremony",
        objectPosition: "50% 50%",
      },
      {
        src: "/images/movie-making-workshop.webp",
        alt: "Colleagues gathered around a table during a film workshop, with a facilitator briefing the group",
        objectPosition: "35% 50%",
      },
      {
        src: "/images/movie-making-selfie.webp",
        alt: "Three colleagues in evening wear taking a selfie with a golden statuette at a gala dinner",
        objectPosition: "50% 40%",
      },
    ],
    addons: {
      heading: "Enhance Your Experience (Optional Upgrades)",
      subheading: "The Full Oscar Experience (Premium Gala Ceremony)",
      intro:
        "Turn your movie screening into a legendary, high-end production that mirrors the prestigious atmosphere of a real film festival awards night.",
      items: [
        {
          icon: "carpet",
          title: "The Grand Entrance (Red Carpet)",
          text: "Guests arrive at your gala dinner venue dressed to impress, walking down a premium red carpet lined with energetic event photographers acting as paparazzi.",
          image: { src: "/images/upgrade-red-carpet.webp", alt: "A red carpet lined with gold stanchions and velvet ropes leading into a gala venue" },
        },
        {
          icon: "photo",
          title: "Branded Press Wall",
          text: "Teams stop and pose for photos in front of a custom-designed press wall complete with your company logos.",
          image: { src: "/images/upgrade-press-wall.webp", alt: "A curved branded press wall with a repeating company logo on a red carpet" },
        },
        {
          icon: "screen",
          title: "Cinema-Grade Production",
          text: "We handle the full studio editing of all team videos, providing the necessary audio-visual equipment, sound system, and screens for professional projections during dinner.",
          image: { src: "/images/upgrade-grand-production.webp", alt: "Guests at a gala dinner watching a team film on a large projection screen" },
        },
        {
          icon: "award",
          title: "The Awards Ceremony",
          text: "Between dinner courses, nominees are announced in classic Hollywood categories. When the envelopes open, winners walk up to accept custom-engraved golden statuettes, delivering emotional and hilarious acceptance speeches.",
          image: { src: "/images/upgrade-awards-ceremony.webp", alt: "A winner in a tuxedo raising a golden statuette and waving at the microphone" },
        },
      ],
    },
    gallery: {
      label: "Photos from the shoot",
      items: [
        { src: "/images/movie-making-gallery-1.webp", alt: "A team member filming a colleague in a blonde wig and sunglasses with a camcorder on a Sarajevo street", objectPosition: "40% 50%" },
        { src: "/images/movie-making-gallery-2.webp", alt: "Three colleagues in evening wear laughing together as one holds a golden Best Global Partner statuette", objectPosition: "50% 30%" },
        { src: "/images/movie-making-gallery-3.webp", alt: "Colleagues around a round table planning their film with scripts and storyboards", objectPosition: "50% 40%" },
        { src: "/images/movie-making-gallery-4.webp", alt: "A team member filling in a clapperboard-style shot list at an outdoor table while water is poured into glasses" },
        { src: "/images/movie-making-gallery-5.webp", alt: "Hands holding a clapperboard and bottles in front of a stone wall during a scene shoot" },
        { src: "/images/movie-making-gallery-6.webp", alt: "A crew member setting a clapperboard on the pavement for scene 6, take 1" },
        { src: "/images/movie-making-gallery-7.webp", alt: "Guests in evening wear standing and applauding at a gala dinner premiere", objectPosition: "50% 35%" },
      ],
    },
    flow: [
      {
        time: "0:00",
        title: "Briefing and crew formation",
        text: "Teams are formed and the creative brief is revealed. Each crew picks its roles: director, producer, camera operator, actor.",
      },
      {
        time: "0:30",
        title: "Script and storyboard",
        text: "Crews plan the story, sketch the shots and agree who does what before anyone picks up a camera.",
      },
      {
        time: "1:00",
        title: "Shooting around Sarajevo",
        text: "Equipment in hand, crews film their scenes on location against the city's historic backdrop, working to a fixed timeline.",
      },
      {
        time: "2:30",
        title: "Editing and finishing",
        text: "The footage is cut into a short film, with our team on hand to help with the technical side.",
      },
      {
        time: "3:30",
        title: "Premiere and awards",
        text: "The films are screened for the whole group at your event, followed by an awards round.",
      },
    ],
    outcomes: [
      {
        title: "Roles chosen by strength",
        text: "Directors, producers, camera operators and actors all matter, so people end up doing what they are good at, not what their job title suggests.",
      },
      {
        title: "Planning under a deadline",
        text: "Crews have to agree a concept, divide the work and deliver on time. It mirrors a real project, only more fun.",
      },
      {
        title: "A result you can keep",
        text: "Each team leaves with its own short film, a record of the event that people will want to share afterwards.",
      },
    ],
    included: [
      "Cameras and all filming equipment for every crew",
      "Briefing, creative brief tailored to your company and a clear timeline",
      "Support from our team during shooting and editing",
      "A screening of all films at your event",
      "Scoring, awards and a copy of the films for your group",
    ],
    logistics: [
      "Timings are agreed directly with your event planner or DMC so the screening lands at the start of your evening event",
      "Comfortable shoes are recommended, as crews move around the city while filming",
      "A written weather plan with indoor shooting locations is agreed in advance",
    ],
    faq: [
      {
        q: "Does anyone need film or acting experience?",
        a: "No. Every crew needs directors, producers, camera operators and actors, so there is a role for each personality. Our team helps with the technical side.",
      },
      {
        q: "Can the films be about our company?",
        a: "Yes. The brief can be a satirical advert, a music video or a mockumentary, built around your products, values and company culture.",
      },
      {
        q: "What happens if the weather turns?",
        a: "We monitor conditions from three days out. If needed, crews shoot at indoor locations, at no extra charge.",
      },
    ],
  },
  {
    slug: "sarajevo-old-town-challenge",
    title: "Sarajevo Old Town Challenge",
    eyebrow: "City quest · Old Town · Half day",
    tagline:
      "An action-packed quest through cobblestone streets, with local traditions to unlock and a clock that keeps running.",
    summary:
      "A fast-paced team quest through Sarajevo's Old Town. Teams tackle quirky challenges, collect group photos and compete for the top of the leaderboard, with a closing ceremony at the end.",
    duration: "1.5 – 3 hours",
    groupSize: "10 – 500 guests",
    setting: "Baščaršija and the Old Town, on foot",
    season: "Year-round, with a written rain plan",
    scene: "oldtown",
    bestFor: "Daytime programmes, incentive groups and conferences that want an active, high-energy way to explore the city together",
    cardImage: {
      src: "/images/old-town-challenge.webp",
      alt: "Colleagues in Baščaršija laughing as one puts a red fez on a teammate while another takes a photo",
      focus: "55% 40%",
    },
    image: {
      src: "/images/gastronomy-wine.webp",
      alt: "Four colleagues with a checklist and a folded map on the Miljacka embankment in Sarajevo, with the Latin Bridge, the City Hall and a tram behind them, one holding a Team 5 sign",
      focus: { card: "85% 50%", mobile: "88% 50%", desktop: "78% 50%" },
      layout: "cover",
    },
    intro: [
      "Get ready for an action-packed quest through the heart of one of Europe’s most fascinating cities! Teams will navigate historical cobblestone streets and unlock local traditions while racing against the clock. From tackling quirky challenges to capturing unforgettable group photos, this experience guarantees non-stop laughter and high-energy bonding. Want a personal touch? We can easily weave your company’s core values and insider jokes directly into the game!",
      "The adventure unfolds across diverse, fast-paced rounds that push your team's synergy to the next level. While certain roadblocks demand collective brainstorming, other hidden missions will require individual team members to step into the spotlight. It’s an immersive playground designed to strengthen communication, spark creative problem-solving, and build unbreakable workplace trust.",
      "Our energetic facilitators guide you every step of the way, keeping the momentum alive and managing the leaderboard. The journey wraps up with an exciting closing ceremony where the final scores are revealed, champions are crowned, and everyone relives the funniest highlights of the day over a shared laugh.",
      "Perfect for teams of all sizes, fitness levels, and industries—from fast-growing tech startups to established corporate giants. This challenge requires zero advance prep and fits seamlessly into any team-building itinerary, leaving your crew with memories they’ll talk about for months.",
    ],
    leaderNote: {
      heading: "Zero prep for you and your team",
      text: "Delegates only need comfortable shoes and a sense of humour. We handle the briefing, the route, the scoring and the closing ceremony, and the quest slots into any itinerary, whether it opens a conference or fills an afternoon gap.",
    },
    idealFor: [
      "Teams of all sizes and fitness levels, from 10 to 500 guests",
      "Startups and established corporates, from kick-offs to incentive trips",
      "Groups who want laughter, bonding and a shared story to take home",
    ],
    heroPhotos: tabletRaceHeroPhotos,
    addons: makeAddons("Sarajevo Old Town Challenge"),
    gallery: {
      label: "Photos from the challenge",
      items: [
        { src: "/images/old-town-gallery-1.webp", alt: "Four colleagues posing on a narrow stone staircase, one holding up a team number sign", objectPosition: "50% 40%" },
        { src: "/images/old-town-gallery-2.webp", alt: "A team celebrating outside a stone wine bar with a number 1 team sign and glasses of red wine", objectPosition: "50% 50%" },
        { src: "/images/old-town-gallery-3.webp", alt: "A group reading their clues and map together on a busy Old Town street corner", objectPosition: "50% 60%" },
        { src: "/images/old-town-gallery-4.webp", alt: "Teammates gathered at a street crossing, reading their challenge booklet", objectPosition: "50% 45%" },
        { src: "/images/old-town-gallery-5.webp", alt: "A team member pointing at the map while colleagues plan their route next to a mirrored sculpture", objectPosition: "50% 40%" },
        { src: "/images/old-town-gallery-6.webp", alt: "Colleagues in matching polo shirts posing around a stone hut, one peeking out from inside", objectPosition: "50% 50%" },
        { src: "/images/old-town-gallery-7.webp", alt: "Laughing teammates in yellow headbands celebrating together in a lively bar", objectPosition: "50% 40%" },
        { src: "/images/old-town-gallery-8.webp", alt: "A couple of teammates posing on a stone wall by the river holding their challenge booklet", objectPosition: "50% 50%" },
      ],
    },
    flow: [
      {
        time: "0:00",
        title: "Welcome and briefing",
        text: "Teams are formed and named, the rules are explained and the clock is set. Your facilitators keep the energy up from the first minute.",
      },
      {
        time: "0:20",
        title: "Quest through the Old Town",
        text: "Teams move through the cobblestone streets, unlocking local traditions in fast-paced rounds that mix quirky challenges with group photo tasks.",
      },
      {
        time: "1:30",
        title: "Hidden missions",
        text: "Some roadblocks need collective brainstorming, while others call on individual team members to step into the spotlight.",
      },
      {
        time: "2:15",
        title: "Closing ceremony",
        text: "Final scores are revealed, champions are crowned and the funniest highlights of the day are relived together.",
      },
    ],
    outcomes: [
      {
        title: "Stronger communication",
        text: "Shared problems and tight timings get people talking to colleagues they rarely work with.",
      },
      {
        title: "Creative problem-solving",
        text: "Varied rounds reward lateral thinking, so different people take the lead at different moments.",
      },
      {
        title: "Trust that carries back to work",
        text: "Winning, losing and laughing together builds the kind of workplace trust that is hard to create in a meeting room.",
      },
    ],
    included: [
      "Energetic local facilitators for the whole challenge",
      "Briefing, route, challenges and live leaderboard",
      "All materials and equipment for the game",
      "Closing ceremony with champions crowned",
      "Your company values and insider jokes written into the game, on request",
    ],
    logistics: [
      "Zero advance preparation is needed from your team",
      "Timings and meeting point are agreed directly with your event planner or DMC",
      "A written rain plan is agreed in advance",
    ],
    faq: [
      {
        q: "How physically demanding is it?",
        a: "It is a walking quest at an easy pace, suitable for all fitness levels. We can adapt routes and roles on request.",
      },
      {
        q: "Can the game include our company values?",
        a: "Yes. Your core values and insider jokes can be woven directly into the challenges once the booking is confirmed.",
      },
      {
        q: "What happens if the weather turns?",
        a: "We monitor conditions from three days out and agree a written rain plan with you in advance.",
      },
    ],
  },
];

export function getActivity(slug: string) {
  return activities.find((a) => a.slug === slug);
}
