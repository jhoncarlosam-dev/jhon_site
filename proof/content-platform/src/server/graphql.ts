import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType,
} from "graphql";
import { parseSegment, parseVariant } from "../../content/personalize";
import type { ContentRepository } from "../../content/repository";
import type { ResolvedBlock } from "../../content/types";

export type GraphQLContext = {
  repository: ContentRepository;
};

function blockTypeName(block: ResolvedBlock): string | undefined {
  switch (block.type) {
    case "hero":
      return "HeroBlock";
    case "features":
      return "FeatureGridBlock";
    case "location":
      return "LocationBlock";
    case "form":
      return "FormBlock";
    default:
      return undefined;
  }
}

export function buildContentSchema(): GraphQLSchema {
  const featureType = new GraphQLObjectType({
    name: "Feature",
    fields: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      text: { type: new GraphQLNonNull(GraphQLString) },
    },
  });

  const formFieldType = new GraphQLObjectType({
    name: "FormField",
    fields: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      label: { type: new GraphQLNonNull(GraphQLString) },
      fieldType: { type: new GraphQLNonNull(GraphQLString) },
      required: { type: new GraphQLNonNull(GraphQLBoolean) },
      options: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(GraphQLString)),
        ),
      },
    },
  });

  const heroType = new GraphQLObjectType({
    name: "HeroBlock",
    fields: {
      type: { type: new GraphQLNonNull(GraphQLString) },
      experimentId: { type: new GraphQLNonNull(GraphQLString) },
      variant: { type: new GraphQLNonNull(GraphQLString) },
      segment: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      subtitle: { type: new GraphQLNonNull(GraphQLString) },
    },
  });

  const featureGridType = new GraphQLObjectType({
    name: "FeatureGridBlock",
    fields: {
      type: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      items: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(featureType)),
        ),
      },
    },
  });

  const locationType = new GraphQLObjectType({
    name: "LocationBlock",
    fields: {
      type: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      address: { type: new GraphQLNonNull(GraphQLString) },
      latitude: { type: new GraphQLNonNull(GraphQLFloat) },
      longitude: { type: new GraphQLNonNull(GraphQLFloat) },
      mapUrl: { type: new GraphQLNonNull(GraphQLString) },
      temperatureC: {
        type: GraphQLFloat,
        resolve: (block: Extract<ResolvedBlock, { type: "location" }>) =>
          block.weather?.temperatureC ?? null,
      },
      windKph: {
        type: GraphQLFloat,
        resolve: (block: Extract<ResolvedBlock, { type: "location" }>) =>
          block.weather?.windKph ?? null,
      },
    },
  });

  const formType = new GraphQLObjectType({
    name: "FormBlock",
    fields: {
      type: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      submitLabel: { type: new GraphQLNonNull(GraphQLString) },
      successMessage: { type: new GraphQLNonNull(GraphQLString) },
      fields: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(formFieldType)),
        ),
      },
    },
  });

  const blockType = new GraphQLUnionType({
    name: "Block",
    types: [heroType, featureGridType, locationType, formType],
    resolveType: (block: ResolvedBlock) => blockTypeName(block),
  });

  const experimentType = new GraphQLObjectType({
    name: "Experiment",
    fields: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      variant: { type: new GraphQLNonNull(GraphQLString) },
    },
  });

  const pageType = new GraphQLObjectType({
    name: "Page",
    fields: {
      slug: { type: new GraphQLNonNull(GraphQLString) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      segment: { type: new GraphQLNonNull(GraphQLString) },
      experiment: { type: experimentType },
      blocks: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(blockType)),
        ),
      },
    },
  });

  const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
      page: {
        type: pageType,
        args: {
          slug: { type: new GraphQLNonNull(GraphQLString) },
          visitorId: { type: new GraphQLNonNull(GraphQLString) },
          segment: { type: GraphQLString },
          variant: { type: GraphQLString },
        },
        resolve: (
          _source: unknown,
          args: {
            slug: string;
            visitorId: string;
            segment?: string | null;
            variant?: string | null;
          },
          context: GraphQLContext,
        ) =>
          context.repository.getPersonalizedPage(args.slug, {
            visitorId: args.visitorId,
            segment: parseSegment(args.segment),
            variant: parseVariant(args.variant),
          }),
      },
    },
  });

  return new GraphQLSchema({ query: queryType });
}
