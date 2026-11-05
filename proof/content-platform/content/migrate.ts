import type {
  Block,
  FeatureGridBlock,
  FormBlock,
  FormField,
  HeroBlock,
  LocationBlock,
  PageEntry,
  Segment,
  Variant,
} from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown, label: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

const variantIds: Variant[] = ["A", "B"];
const segmentIds: Segment[] = ["visitor", "subscriber"];

function validateHero(block: Record<string, unknown>): HeroBlock {
  const experimentId = asString(block.experimentId, "Hero experimentId");
  if (!isRecord(block.variants)) {
    throw new Error("Hero variants must be an object");
  }
  const variants = {} as HeroBlock["variants"];
  for (const variant of variantIds) {
    const bySegment = block.variants[variant];
    if (!isRecord(bySegment)) {
      throw new Error(`Hero variant ${variant} is missing`);
    }
    variants[variant] = {} as HeroBlock["variants"][Variant];
    for (const segment of segmentIds) {
      const copy = bySegment[segment];
      if (!isRecord(copy)) {
        throw new Error(`Hero ${variant}/${segment} is missing`);
      }
      variants[variant][segment] = {
        title: asString(copy.title, `Hero ${variant}/${segment} title`),
        subtitle: asString(
          copy.subtitle,
          `Hero ${variant}/${segment} subtitle`,
        ),
      };
    }
  }
  return { type: "hero", experimentId, variants };
}

function heroFromFlat(block: Record<string, unknown>): HeroBlock {
  const heading = asString(block.heading, "Hero heading");
  const subtitle = asString(block.subtitle, "Hero subtitle");
  const experimentId =
    typeof block.experimentId === "string" && block.experimentId.trim()
      ? block.experimentId
      : "home-hero";
  return validateHero({
    type: "hero",
    experimentId,
    variants: {
      A: {
        visitor: { title: heading, subtitle },
        subscriber: { title: `${heading} — subscriber`, subtitle },
      },
      B: {
        visitor: { title: `${heading} — version B`, subtitle },
        subscriber: { title: `${heading} — version B, subscriber`, subtitle },
      },
    },
  });
}

function validateFeatures(block: Record<string, unknown>): FeatureGridBlock {
  const title = asString(block.title, "Feature grid title");
  if (!Array.isArray(block.items) || block.items.length === 0) {
    throw new Error("Feature grid needs items");
  }
  const items = block.items.map((item, index) => {
    if (!isRecord(item)) throw new Error(`Feature ${index} is invalid`);
    return {
      title: asString(item.title, `Feature ${index} title`),
      text: asString(item.text, `Feature ${index} text`),
    };
  });
  return { type: "features", title, items };
}

function validateLocation(block: Record<string, unknown>): LocationBlock {
  const latitude = block.latitude;
  const longitude = block.longitude;
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    throw new Error("Location needs numeric coordinates");
  }
  return {
    type: "location",
    title: asString(block.title, "Location title"),
    address: asString(block.address, "Location address"),
    latitude,
    longitude,
  };
}

function validateField(field: unknown, index: number): FormField {
  if (!isRecord(field)) throw new Error(`Form field ${index} is invalid`);
  const fieldType = field.fieldType;
  if (fieldType !== "text" && fieldType !== "email" && fieldType !== "select") {
    throw new Error(`Form field ${index} has an unknown type`);
  }
  const options = Array.isArray(field.options)
    ? field.options.filter(
        (option): option is string => typeof option === "string",
      )
    : [];
  if (fieldType === "select" && options.length === 0) {
    throw new Error(`Form field ${index} needs options`);
  }
  return {
    name: asString(field.name, `Form field ${index} name`),
    label: asString(field.label, `Form field ${index} label`),
    fieldType,
    required: field.required === true,
    options,
  };
}

function validateForm(block: Record<string, unknown>): FormBlock {
  if (!Array.isArray(block.fields) || block.fields.length === 0) {
    throw new Error("Form needs fields");
  }
  return {
    type: "form",
    title: asString(block.title, "Form title"),
    submitLabel: asString(block.submitLabel, "Form submit label"),
    successMessage: asString(block.successMessage, "Form success message"),
    fields: block.fields.map(validateField),
  };
}

function validateBlock(block: unknown, index: number): Block {
  if (!isRecord(block) || typeof block.type !== "string") {
    throw new Error(`Block ${index} is invalid`);
  }
  if (block.type === "hero") return validateHero(block);
  if (block.type === "features") return validateFeatures(block);
  if (block.type === "location") return validateLocation(block);
  if (block.type === "form") return validateForm(block);
  throw new Error(`Block ${index} has unknown type ${String(block.type)}`);
}

export function migratePage(input: unknown): PageEntry {
  if (!isRecord(input)) throw new Error("Page entry must be an object");
  if (input.schemaVersion !== 1 && input.schemaVersion !== 2) {
    throw new Error("Page schemaVersion must be 1 or 2");
  }
  if (input.type !== "page") throw new Error("Entry type must be page");
  if (!Array.isArray(input.blocks))
    throw new Error("Page entry is missing blocks");

  const blocks = input.blocks.map((block, index) => {
    if (
      input.schemaVersion === 1 &&
      isRecord(block) &&
      block.type === "hero" &&
      !block.variants
    ) {
      return heroFromFlat(block);
    }
    return validateBlock(block, index);
  });

  return {
    schemaVersion: 2,
    type: "page",
    slug: asString(input.slug, "Page slug"),
    title: asString(input.title, "Page title"),
    blocks,
  };
}
