import type { JourneyStep, RouteId, TimelineEvent, TrailRoute } from "@/types/trail";

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
    description: "Homelands, towns, farms, and political systems flourished across the Southeast.",
    icon: "landmark",
  },
  {
    id: "the-law",
    title: "The Law",
    description: "Federal policy and treaty pressure framed expulsion as legal and inevitable.",
    icon: "scale",
  },
  {
    id: "the-route",
    title: "The Route",
    description: "Different nations were forced along different paths, seasons, and military corridors.",
    icon: "route",
  },
  {
    id: "the-human-cost",
    title: "The Human Cost",
    description: "Disease, exposure, hunger, and imprisonment turned removal into mass suffering.",
    icon: "users",
  },
  {
    id: "conclusion",
    title: "Conclusion",
    description: "The story is not migration by choice. It is removal by policy, design, and force.",
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
      "The best-known Trail of Tears detachments left from stockades in 1838 and moved west by road, rail, and river.",
    displacement: "From Georgia, Alabama, and Tennessee toward the Cherokee Nation in Indian Territory.",
    featuredEventId: "cherokee-removal",
    sources: [
      { label: "National Park Service", url: "https://www.nps.gov/trte/index.htm" },
      { label: "Cherokee Nation History", url: "https://cherokee.org/about-the-nation/history/" },
    ],
    lineCoordinates: [
      [34.44, -85.72],
      [35.05, -85.31],
      [35.64, -86.24],
      [35.84, -87.18],
      [35.55, -88.78],
      [35.14, -90.03],
      [35.08, -91.28],
      [34.75, -92.29],
      [35.22, -92.61],
      [35.58, -93.9],
      [35.92, -94.97],
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
      "Choctaw removal began immediately after the 1830 Treaty of Dancing Rabbit Creek and unfolded in several forced waves.",
    displacement: "From Mississippi across the Arkansas corridor into the Choctaw Nation in Indian Territory.",
    featuredEventId: "choctaw-removal",
    sources: [
      { label: "Choctaw Nation History", url: "https://www.choctawnation.com/about/history/" },
      {
        label: "Choctaw Nation Historical Documents",
        url: "https://www.choctawnation.com/about/history/historical-documents/",
      },
    ],
    lineCoordinates: [
      [32.78, -89.48],
      [33.18, -90.08],
      [33.62, -91.03],
      [34.02, -91.34],
      [33.94, -92.05],
      [34.16, -93.16],
      [34.16, -94.18],
      [34.03, -95.27],
      [34.62, -95.93],
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
        title: "Arkansas Crossing, Arkansas",
        subtitle: "River and road corridor",
        year: "1831 to 1833",
        coordinates: [34.02, -91.34],
        description:
          "Choctaw parties crossed flood-prone Arkansas country while facing hunger, disease, and exposure as removal unfolded in waves.",
        significance:
          "This stop represents the Arkansas corridor of removal rather than a single camp, emphasizing how crossings, weather, and logistics shaped the journey.",
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
      "Chickasaw removal followed land sale and treaty negotiations, but it still forced families west under the 1837 Treaty of Doaksville.",
    displacement:
      "From northern Mississippi through the Memphis corridor into the Chickasaw district in Indian Territory.",
    featuredEventId: "chickasaw-removal",
    sources: [
      { label: "Chickasaw Nation History", url: "https://chickasaw.net/Our-Nation/History.aspx" },
      {
        label: "Chickasaw Nation Removal",
        url: "https://chickasaw.net/Our-Nation/History/Removal.aspx",
      },
    ],
    lineCoordinates: [
      [34.24, -88.99],
      [34.82, -89.54],
      [35.15, -90.05],
      [34.73, -90.92],
      [34.6, -92.01],
      [34.38, -93.17],
      [34.27, -94.46],
      [34.23, -96.68],
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
        year: "1837 to 1838",
        coordinates: [35.15, -90.05],
        description:
          "The Mississippi River corridor connected eastern homelands to western routes but also created delays and logistical strain.",
        significance:
          "Transport infrastructure shaped who moved, when they moved, and how vulnerable detachments were along the way.",
      },
      {
        id: "chickasaw-district",
        title: "Chickasaw District, Indian Territory",
        subtitle: "Initial resettlement in the west",
        year: "1837 to 1838",
        coordinates: [34.23, -96.68],
        description:
          "Chickasaw families entered a district purchased within Choctaw Territory and began rebuilding under radically altered conditions.",
        significance:
          "This avoids treating later Tishomingo as an 1830s removal stop; the westward journey ended first in a broader Chickasaw district before later political centers emerged.",
      },
    ],
  },
  {
    id: "creek",
    tribe: "Creek",
    label: "Creek Route",
    color: "#2472b0",
    overview:
      "Muscogee removal accelerated after internal division, land cessions, and the Creek War of 1836.",
    displacement:
      "From Georgia and Alabama, through Montgomery, toward western settlements in Indian Territory.",
    featuredEventId: "creek-removal",
    sources: [
      {
        label: "National Park Service: The Muscogee Nation",
        url: "https://www.nps.gov/ocmu/learn/historyculture/the-muscogee-nation.htm",
      },
      { label: "The Muscogee Nation", url: "https://www.muscogeenation.com/" },
    ],
    lineCoordinates: [
      [32.46, -84.99],
      [32.28, -85.72],
      [32.38, -86.31],
      [32.28, -86.76],
      [32.35, -87.86],
      [32.62, -89.02],
      [33.34, -90.22],
      [34.28, -91.98],
      [35.02, -93.54],
      [35.75, -95.37],
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
      "Seminole removal unfolded through the Second Seminole War, capture, detention, and maritime transport, making it one of the longest and most violent removal campaigns.",
    displacement:
      "From central Florida to Fort Brooke on Tampa Bay, then by ship across the Gulf Coast corridor toward New Orleans and on to Indian Territory.",
    featuredEventId: "seminole-removal",
    sources: [
      {
        label: "Fort King Heritage Foundation",
        url: "https://ftking.org/the-three-seminole-wars/",
      },
      { label: "The Seminole Nation of Oklahoma", url: "https://www.sno-nsn.gov/" },
    ],
    lineCoordinates: [
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
      [31.31, -92.45],
      [32.53, -93.75],
      [33.66, -94.18],
      [34.69, -94.82],
      [35.8, -95.25],
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
        year: "1842",
        coordinates: [35.8, -95.25],
        description:
          "Removal concluded unevenly, with many Seminoles forced west toward Indian Territory while others remained in Florida.",
        significance:
          "The Seminole story complicates any simple endpoint and shows the limits of federal power even amid extreme violence.",
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
    summary: "Federal law formalizes the push to exchange eastern Native lands for territory farther west.",
  },
  {
    id: "choctaw-removal",
    year: "1830 to 1833",
    title: "Choctaw removal begins",
    summary: "One of the earliest large-scale removals unfolds under treaty pressure and hazardous travel conditions.",
    routeId: "choctaw",
  },
  {
    id: "creek-removal",
    year: "1836",
    title: "Creek removal intensifies",
    summary: "Conflict, confinement, and military transport accelerate Creek displacement from Alabama and Georgia.",
    routeId: "creek",
  },
  {
    id: "chickasaw-removal",
    year: "1837",
    title: "Chickasaw cession and relocation",
    summary: "Land sale agreements still culminate in westward displacement and the rebuilding of community in exile.",
    routeId: "chickasaw",
  },
  {
    id: "cherokee-removal",
    year: "1838 to 1839",
    title: "Cherokee detachments march west",
    summary: "Stockades, winter travel, and long overland routes turn removal into the most widely remembered Trail of Tears.",
    routeId: "cherokee",
  },
  {
    id: "seminole-removal",
    year: "1842",
    title: "Seminole removal campaign wanes",
    summary: "War, capture, and resistance define the most prolonged removal effort of the five nations.",
    routeId: "seminole",
  },
];
