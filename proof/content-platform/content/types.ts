export type Segment = "visitor" | "subscriber";
export type Variant = "A" | "B";

export type Audience = {
  visitorId: string;
  segment: Segment;
  variant?: Variant;
};

export type HeroCopy = {
  title: string;
  subtitle: string;
};

export type HeroBlock = {
  type: "hero";
  experimentId: string;
  variants: Record<Variant, Record<Segment, HeroCopy>>;
};

export type FeatureItem = {
  title: string;
  text: string;
};

export type FeatureGridBlock = {
  type: "features";
  title: string;
  items: FeatureItem[];
};

export type LocationBlock = {
  type: "location";
  title: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type FormField = {
  name: string;
  label: string;
  fieldType: "text" | "email" | "select";
  required: boolean;
  options: string[];
};

export type FormBlock = {
  type: "form";
  title: string;
  submitLabel: string;
  successMessage: string;
  fields: FormField[];
};

export type Block = HeroBlock | FeatureGridBlock | LocationBlock | FormBlock;

export type PageEntry = {
  schemaVersion: 2;
  type: "page";
  slug: string;
  title: string;
  blocks: Block[];
};

export type ResolvedHero = {
  type: "hero";
  experimentId: string;
  variant: Variant;
  segment: Segment;
  title: string;
  subtitle: string;
};

export type WeatherReport = {
  temperatureC: number;
  windKph: number;
};

export type ResolvedLocation = LocationBlock & {
  mapUrl: string;
  weather: WeatherReport | null;
};

export type ResolvedBlock =
  ResolvedHero | FeatureGridBlock | ResolvedLocation | FormBlock;

export type PersonalizedPage = {
  slug: string;
  title: string;
  segment: Segment;
  experiment: { id: string; variant: Variant } | null;
  blocks: ResolvedBlock[];
};
