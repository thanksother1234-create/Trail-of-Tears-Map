import type { JourneyStep, RouteId, TimelineEvent, TrailRoute } from "@/types/trail";

export const journeyGuideTitle = "A guided reading path";
export const journeyGuideDescription =
  "Move through the sections in order if you want the page to feel less like an exhibit label and more like a lived sequence of policy, confinement, transport, and survival.";
export const journeyGuideYears = "1830 to the 1850s";
export const journeyQuote =
  '"It will place a dense and civilized population in large tracts of country now occupied by a few savage hunters."';
export const journeyQuoteAttribution = "- Andrew Jackson, Second Annual Message to Congress, December 6, 1830";
export const journeyQuoteSourceUrl =
  "https://www.presidency.ucsb.edu/documents/second-annual-message-3";

export const routeOrder: RouteId[] = [
  "cherokee",
  "choctaw",
  "chickasaw",
  "creek",
  "seminole",
];

export const journeySteps: JourneyStep[] = [
  {
    id: "before-removal",
    title: "Before Removal",
    description:
      "These were lived homelands with farms, laws, trade routes, and kinship networks, not open land waiting to be taken.",
    icon: "landmark",
  },
  {
    id: "the-law",
    title: "The Law",
    description:
      "Congress, state power, and treaty pressure recast dispossession as paperwork, policy, and supposed inevitability.",
    icon: "scale",
  },
  {
    id: "the-route",
    title: "The Route",
    description:
      "Removal unfolded through stockades, river landings, wagon roads, winter camps, and military escort rather than one single trail.",
    icon: "route",
  },
  {
    id: "the-human-cost",
    title: "The Human Cost",
    description:
      "People died before, during, and after the march as confinement, exposure, hunger, and grief compounded.",
    icon: "users",
  },
  {
    id: "conclusion",
    title: "Conclusion",
    description:
      "The map ends in the west, but the story continues in rebuilding, survival, memory, and unresolved loss.",
    icon: "flag",
  },
];

export const trailRoutes: TrailRoute[] = [
  {
    id: "cherokee",
    tribe: "Cherokee",
    label: "Cherokee Route",
    color: "#6b40ab",
    overview:
      "The Cherokee detachments of 1838 and 1839 became the most widely remembered image of the Trail of Tears. The map separates three documented corridors rather than combining departure points and travel modes into one imagined march.",
    readingLens:
      "Choose a corridor to see why the Trail of Tears was not one clean line: the water route, northern land route, and Benge detachment began in different places and followed different paths. The violence began in confinement and continued through transport, weather, disease, and shortage.",
    displacement:
      "From Cherokee homelands in Georgia, Alabama, and Tennessee toward the reconstituted Cherokee Nation in Indian Territory.",
    featuredEventId: "cherokee-removal",
    sources: [
      {
        label: "National Park Service: Cherokee Removal Transportation",
        url: "https://www.nps.gov/articles/000/introduction-transportation-during-the-cherokee-removal-1837-1839.htm",
      },
      { label: "Cherokee Nation History", url: "https://cherokee.org/about-the-nation/history/" },
    ],
    routeLines: [
      {
        id: "cherokee-water",
        label: "Water route from Ross's Landing",
        transport: "water",
        coordinates: [
          [35.05, -85.31],
          [35.62, -86.55],
          [36.35, -87.8],
          [37.0, -88.75],
          [37.0, -89.15],
          [35.14, -90.03],
          [34.02, -91.35],
          [34.75, -92.29],
          [35.3, -93.1],
          [35.4, -94.42],
          [35.8, -95.25],
        ],
      },
      {
        id: "cherokee-northern",
        label: "Northern land-route corridor from Fort Cass",
        transport: "land",
        coordinates: [
          [35.32, -84.79],
          [36.05, -85.65],
          [36.72, -87.55],
          [37.0, -88.5],
          [37.0, -89.15],
          [36.35, -90.42],
          [35.7, -91.35],
          [35.5, -92.55],
          [35.62, -93.85],
          [35.92, -94.97],
        ],
      },
      {
        id: "cherokee-benge",
        label: "Benge detachment corridor from Fort Payne",
        transport: "land",
        coordinates: [
          [34.44, -85.72],
          [34.85, -86.38],
          [35.35, -87.18],
          [35.9, -88.0],
          [36.76, -88.95],
          [36.76, -89.12],
          [36.05, -90.15],
          [35.58, -91.25],
          [35.45, -92.48],
          [35.65, -93.8],
          [35.92, -94.97],
        ],
      },
    ],
    locations: [
      {
        id: "fort-payne",
        title: "Fort Payne, Alabama",
        subtitle: "Cherokee stockade",
        year: "1838",
        coordinates: [34.44, -85.72],
        description:
          "Families were confined in stockades and makeshift camps before detachments began the march west.",
        significance:
          "Conditions in these holding areas were overcrowded and unsanitary, shaping the suffering that began before the overland trek itself.",
      },
      {
        id: "rosss-landing",
        title: "Ross's Landing, Tennessee",
        subtitle: "River staging point",
        year: "1838",
        coordinates: [35.05, -85.31],
        description:
          "Detachments converged on river access points where transport plans changed with water levels and military control.",
        significance:
          "The route west was not a single line but a shifting system of roads and river segments managed under federal authority.",
      },
      {
        id: "little-rock",
        title: "Little Rock, Arkansas",
        subtitle: "Transit corridor",
        year: "1838 to 1839",
        coordinates: [34.75, -92.29],
        description:
          "Cherokee detachments crossed Arkansas during brutal winter conditions and dwindling supplies.",
        significance:
          "Crossing Arkansas marked one of the hardest stretches, where cold weather and exhaustion accelerated deaths on the journey.",
      },
      {
        id: "tahlequah",
        title: "Tahlequah, Indian Territory",
        subtitle: "Arrival in the west",
        year: "1839",
        coordinates: [35.92, -94.97],
        description:
          "The surviving Cherokee reached a new homeland already shaped by displacement, grief, and political upheaval.",
        significance:
          "Arrival did not end removal. Communities then had to rebuild government, kinship networks, and everyday life under coerced relocation.",
      },
    ],
  },
  {
    id: "choctaw",
    tribe: "Choctaw",
    label: "Choctaw Route",
    color: "#d8a130",
    overview:
      "Choctaw removal began almost immediately after the Treaty of Dancing Rabbit Creek, making it one of the earliest large forced removals under the new policy.",
    readingLens:
      "This selected southern corridor helps show that removal was already underway years before the Cherokee detachments fixed the phrase 'Trail of Tears' in public memory. Other Choctaw parties used different land and water routes.",
    displacement:
      "From Mississippi across river and road corridors in Arkansas toward the Choctaw Nation in Indian Territory.",
    featuredEventId: "choctaw-removal",
    sources: [
      {
        label: "Choctaw Nation: Choctaw Removals",
        url: "https://www.choctawnation.com/news/iti-fabvssa/choctaw-removals/",
      },
      {
        label: "Arkansas Heritage: Choctaw removal routes",
        url: "https://www.arkansasheritage.com/docs/default-source/ahpp-documents/state-wide-historic-contexts/indianremoval_new_202074840604-102a-4668-90b9-e78126c2ef92.pdf?sfvrsn=e22ecd76_5",
      },
    ],
    routeLines: [
      {
        id: "choctaw-southern",
        label: "Selected southern removal corridor",
        transport: "mixed",
        coordinates: [
          [32.78, -89.48],
          [33.18, -90.08],
          [33.74, -91.2],
          [34.02, -91.35],
          [34.75, -92.29],
          [34.42, -92.85],
          [34.22, -93.45],
          [34.1, -94.2],
          [34.03, -95.27],
        ],
      },
    ],
    locations: [
      {
        id: "dancing-rabbit-creek",
        title: "Dancing Rabbit Creek, Mississippi",
        subtitle: "Treaty ground",
        year: "1830",
        coordinates: [32.78, -89.48],
        description:
          "The treaty signed here opened the way for large-scale Choctaw removal and land cession in Mississippi.",
        significance:
          "It stands as a central legal turning point, where federal pressure converted homeland into negotiable property.",
      },
      {
        id: "arkansas-crossing",
        title: "Arkansas Post, Arkansas",
        subtitle: "Southern-route staging area",
        year: "1831 to 1833",
        coordinates: [34.02, -91.34],
        description:
          "Early Choctaw removal parties used the Arkansas Post area as they moved through Arkansas by a combination of river and road corridors.",
        significance:
          "The 1831 southern route moved from Arkansas Post toward Little Rock, while later parties followed other corridors. This marker identifies a documented staging area, not one universal crossing.",
      },
      {
        id: "fort-towson",
        title: "Fort Towson, Indian Territory",
        subtitle: "Western receiving point",
        year: "1833",
        coordinates: [34.03, -95.27],
        description:
          "Detachments entered Indian Territory through military and agency corridors that managed settlement in the west.",
        significance:
          "The west was not empty destination space. It became a reorganized Indigenous landscape under coercive federal terms.",
      },
    ],
  },
  {
    id: "chickasaw",
    tribe: "Chickasaw",
    label: "Chickasaw Route",
    color: "#4d8c58",
    overview:
      "Chickasaw removal moved through treaty negotiation and land sale, but the softer language of agreement still ended in coerced westward displacement.",
    readingLens:
      "Read this route as a representative land-and-river corridor, not a survey-accurate track for every Chickasaw family. Payment and paperwork did not make removal voluntary.",
    displacement:
      "From northern Mississippi through the Memphis corridor into the Chickasaw district in Indian Territory.",
    featuredEventId: "chickasaw-removal",
    sources: [
      { label: "Chickasaw Nation: Removal", url: "https://chickasaw.net/Our-Nation/History/Removal.aspx" },
    ],
    routeLines: [
      {
        id: "chickasaw-corridor",
        label: "Representative land-and-river corridor",
        transport: "mixed",
        coordinates: [
          [34.24, -88.99],
          [34.82, -89.54],
          [35.15, -90.05],
          [34.73, -90.92],
          [34.6, -92.01],
          [34.38, -93.17],
          [34.27, -94.46],
          [34.23, -96.68],
        ],
      },
    ],
    locations: [
      {
        id: "pontotoc",
        title: "Pontotoc, Mississippi",
        subtitle: "Homeland center and treaty-era crossroads",
        year: "1837",
        coordinates: [34.24, -88.99],
        description:
          "Negotiations over land sale and westward movement disrupted Chickasaw communities rooted in northern Mississippi.",
        significance:
          "The Chickasaw experience shows how cash settlements and treaty mechanisms still produced coercive removal.",
      },
      {
        id: "memphis-corridor",
        title: "Memphis Crossing",
        subtitle: "Mississippi River corridor",
        year: "1837 to 1851",
        coordinates: [35.15, -90.05],
        description:
          "The Mississippi River corridor connected eastern homelands to western routes but also created delays and logistical strain.",
        significance:
          "Transport infrastructure shaped who moved, when they moved, and how vulnerable detachments were along the way.",
      },
      {
        id: "chickasaw-district",
        title: "Chickasaw District, Indian Territory",
        subtitle: "Regional destination marker",
        year: "1837 onward",
        coordinates: [34.23, -96.68],
        description:
          "This marker represents the broader Chickasaw District purchased within Choctaw Territory, where Chickasaw families began rebuilding under radically altered conditions.",
        significance:
          "It is a regional destination marker rather than a claim that every party arrived at one town. Most Chickasaw removals continued through 1851, even as the district became a place of rebuilding.",
      },
    ],
  },
  {
    id: "creek",
    tribe: "Creek",
    label: "Creek Route",
    color: "#2472b0",
    overview:
      "For the Muscogee (Creek), removal intensified through war, imprisonment, and barge transport after the violence of 1836.",
    readingLens:
      "This selected route follows the major 1836 water corridor: detention near Montgomery, travel through Mobile and New Orleans, then north by the Mississippi and Arkansas Rivers. Other Muscogee parties used related but different routes.",
    displacement:
      "From Georgia and Alabama, through Montgomery and river transport corridors, toward western settlements in Indian Territory.",
    featuredEventId: "creek-removal",
    sources: [
      {
        label: "National Park Service: The Muscogee Nation",
        url: "https://www.nps.gov/ocmu/learn/historyculture/the-muscogee-nation.htm",
      },
      {
        label: "USACE: Creek removal routes through Arkansas",
        url: "https://www.mvm.usace.army.mil/Portals/51/docs/Cultural%20Resources/Final_Report_1_15_08.pdf",
      },
    ],
    routeLines: [
      {
        id: "creek-water",
        label: "Major 1836 water-route corridor",
        transport: "water",
        coordinates: [
          [32.46, -84.99],
          [32.38, -86.31],
          [31.0, -87.2],
          [30.69, -88.04],
          [29.95, -90.07],
          [30.45, -91.14],
          [32.3, -90.9],
          [33.25, -91.18],
          [34.02, -91.35],
          [34.75, -92.29],
          [35.3, -93.1],
          [35.4, -94.42],
          [35.8, -95.25],
          [35.75, -95.37],
        ],
      },
    ],
    locations: [
      {
        id: "lower-creek-country",
        title: "Lower Creek Country, Georgia",
        subtitle: "Eastern homeland under pressure",
        year: "1836",
        coordinates: [32.46, -84.99],
        description:
          "Communities along the Georgia-Alabama line faced escalating land loss, violence, and state pressure as removal intensified.",
        significance:
          "This stop represents the eastern Muscogee homeland under direct pressure rather than a single camp, making the geography of dispossession clearer.",
      },
      {
        id: "montgomery",
        title: "Montgomery, Alabama",
        subtitle: "Barge loading point",
        year: "1836",
        coordinates: [32.38, -86.31],
        description:
          "After the Creek War of 1836, many Muscogee people were marched to Montgomery and crowded onto barges in extreme summer heat.",
        significance:
          "Removal infrastructure ran through existing military and political hubs, linking policy directly to enforcement.",
      },
      {
        id: "creek-nation-west",
        title: "Creek Nation, Indian Territory",
        subtitle: "Western resettlement",
        year: "1836 to 1837",
        coordinates: [35.75, -95.37],
        description:
          "Survivors reached western settlements after a long journey by foot and water and began rebuilding political and social life.",
        significance:
          "Resettlement did not erase the violence of removal; it extended it into every question of rebuilding community.",
      },
    ],
  },
  {
    id: "seminole",
    tribe: "Seminole",
    label: "Seminole Route",
    color: "#c84c38",
    overview:
      "Seminole removal was bound to the Second Seminole War and often moved through capture, detention, and water transport rather than a single overland march.",
    readingLens:
      "The water crossing is intentional. This selected corridor follows Tampa Bay and Gulf transport to New Orleans, then the Mississippi and Arkansas Rivers toward Fort Gibson. Other Seminole removals followed different schedules and transfers.",
    displacement:
      "From central Florida to Fort Brooke on Tampa Bay, then by ship across the Gulf Coast corridor toward New Orleans and onward to Indian Territory.",
    featuredEventId: "seminole-removal",
    sources: [
      {
        label: "Fort King Heritage Foundation: The Three Seminole Wars",
        url: "https://ftking.org/the-three-seminole-wars/",
      },
      {
        label: "National Park Service: Seminole Incarceration",
        url: "https://www.nps.gov/casa/learn/historyculture/seminole-incarceration.htm",
      },
      {
        label: "Arkansas State Parks: Seminole water route",
        url: "https://www.arkansas.com/plan-your-trip/plan/trip-ideas-itineraries/trail-of-tears-across-arkansas-state-parks",
      },
    ],
    routeLines: [
      {
        id: "seminole-water",
        label: "Water-route corridor to Fort Gibson",
        transport: "water",
        coordinates: [
          [29.19, -82.14],
          [27.95, -82.46],
          [28.4, -83.2],
          [29.1, -84.2],
          [29.82, -85.22],
          [30.23, -86.62],
          [30.42, -87.22],
          [30.69, -88.04],
          [29.95, -90.07],
          [30.45, -91.14],
          [32.3, -90.9],
          [33.25, -91.18],
          [34.02, -91.35],
          [34.75, -92.29],
          [35.3, -93.1],
          [35.4, -94.42],
          [35.8, -95.25],
        ],
      },
    ],
    locations: [
      {
        id: "fort-king",
        title: "Fort King, Florida",
        subtitle: "Flashpoint of conflict",
        year: "1835",
        coordinates: [29.19, -82.14],
        description:
          "Fort King became a major flashpoint when violence at and around the post helped ignite the Second Seminole War in late 1835.",
        significance:
          "For the Seminole, removal cannot be separated from the Second Seminole War and the violence of resistance.",
      },
      {
        id: "fort-brooke",
        title: "Fort Brooke, Tampa Bay",
        subtitle: "Embarkation point",
        year: "1837 to 1842",
        coordinates: [27.95, -82.46],
        description:
          "Captured Seminoles were brought to Tampa Bay for detention and transport west during the later years of the war.",
        significance:
          "This stop helps explain why the route crosses the Gulf: part of the removal happened by ship, not by an uninterrupted land march.",
      },
      {
        id: "gulf-transfer",
        title: "Gulf Transfer via New Orleans",
        subtitle: "Maritime and river corridor",
        year: "1837 to 1842",
        coordinates: [29.95, -90.07],
        description:
          "Some westbound transports moved by sea to Louisiana and then into inland corridors leading toward Indian Territory.",
        significance:
          "This is shown as a transfer corridor rather than a simple overland stop, which is why the route crosses the Gulf.",
      },
      {
        id: "fort-gibson",
        title: "Fort Gibson, Indian Territory",
        subtitle: "Western destination",
        year: "1842 and after",
        coordinates: [35.8, -95.25],
        description:
          "By 1842, after the Second Seminole War ended, thousands of Seminoles had been forced west while others remained in Florida. Removals continued into the 1850s.",
        significance:
          "The end of the Second Seminole War was not the end of removal. Continued resistance and later deportations complicate any simple endpoint.",
      },
    ],
  },
];

export const routeLookup = Object.fromEntries(
  trailRoutes.map((route) => [route.id, route]),
) as Record<RouteId, TrailRoute>;

export const timelineEvents: TimelineEvent[] = [
  {
    id: "removal-act",
    year: "1830",
    title: "Indian Removal Act",
    summary:
      "Congress gives federal backing to the exchange of eastern Native homelands for territory farther west, turning dispossession into national policy.",
  },
  {
    id: "choctaw-removal",
    year: "1830 to 1833",
    title: "Choctaw removal begins",
    summary:
      "One of the earliest large-scale removals unfolds in waves under treaty pressure, bad weather, disease, and inadequate supplies.",
    routeId: "choctaw",
  },
  {
    id: "creek-removal",
    year: "1836",
    title: "Creek removal intensifies",
    summary:
      "Conflict, confinement, and military transport accelerate Muscogee displacement from Alabama and Georgia.",
    routeId: "creek",
  },
  {
    id: "chickasaw-removal",
    year: "1837 to 1851",
    title: "Chickasaw removal begins",
    summary:
      "Land sale agreements still culminate in westward displacement. Most Chickasaw removals unfolded from 1837 to 1851, showing how negotiated language could mask coercive outcomes.",
    routeId: "chickasaw",
  },
  {
    id: "cherokee-removal",
    year: "1838 to 1839",
    title: "Cherokee detachments march west",
    summary:
      "Stockades, winter travel, and long overland routes turn Cherokee removal into the most widely remembered image of the Trail of Tears.",
    routeId: "cherokee",
  },
  {
    id: "seminole-removal",
    year: "1842 and after",
    title: "Second Seminole War ends; removal continues",
    summary:
      "The Second Seminole War ended in 1842, but later removals continued into the 1850s as Seminole resistance endured.",
    routeId: "seminole",
  },
];
