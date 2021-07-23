// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: iaGC8N7icN64RQS5kdk5ev
// Component: 9a0YfTNxDA
import * as React from "react";

import * as p from "@plasmicapp/react-web";

import {
  hasVariant,
  classNames,
  wrapWithClassName,
  createPlasmicElementProxy,
  makeFragment,
  MultiChoiceArg,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  pick,
  omit,
  useTrigger,
  StrictProps,
  deriveRenderOpts,
  ensureGlobalVariants
} from "@plasmicapp/react-web";

import "@plasmicapp/react-web/lib/plasmic.css";
import * as defaultcss from "../plasmic__default_style.module.css"; // plasmic-import: global/defaultcss
import * as projectcss from "./plasmic_fire_spot.module.css"; // plasmic-import: iaGC8N7icN64RQS5kdk5ev/projectcss
import * as sty from "./PlasmicSearchIcon.module.css"; // plasmic-import: 9a0YfTNxDA/css

import Vector2Icon from "./icons/PlasmicIcon__Vector2"; // plasmic-import: _hIlKDMChB/icon

export type PlasmicSearchIcon__VariantMembers = {};

export type PlasmicSearchIcon__VariantsArgs = {};
type VariantPropType = keyof PlasmicSearchIcon__VariantsArgs;
export const PlasmicSearchIcon__VariantProps = new Array<VariantPropType>();

export type PlasmicSearchIcon__ArgsType = {};
type ArgPropType = keyof PlasmicSearchIcon__ArgsType;
export const PlasmicSearchIcon__ArgProps = new Array<ArgPropType>();

export type PlasmicSearchIcon__OverridesType = {
  root?: p.Flex<"svg">;
};

export interface DefaultSearchIconProps {
  className?: string;
}

function PlasmicSearchIcon__RenderFunc(props: {
  variants: PlasmicSearchIcon__VariantsArgs;
  args: PlasmicSearchIcon__ArgsType;
  overrides: PlasmicSearchIcon__OverridesType;
  dataFetches?: PlasmicSearchIcon__Fetches;
  forNode?: string;
}) {
  const { variants, args, overrides, forNode, dataFetches } = props;

  return (
    <Vector2Icon
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      className={classNames(defaultcss.all, projectcss.root_reset, sty.root)}
      role={"img"}
    />
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  typeof PlasmicDescendants[T][number];
type NodeDefaultElementType = {
  root: "svg";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicSearchIcon__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicSearchIcon__VariantsArgs;
    args?: PlasmicSearchIcon__ArgsType;
    overrides?: NodeOverridesType<T>;
    dataFetches?: PlasmicSearchIcon__Fetches;
  } & Omit<PlasmicSearchIcon__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    // Specify args directly as props
    Omit<PlasmicSearchIcon__ArgsType, ReservedPropsType> &
    // Specify overrides for each element directly as props
    Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    // Specify props for the root element
    Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = deriveRenderOpts(props, {
      name: nodeName,
      descendantNames: [...PlasmicDescendants[nodeName]],
      internalArgPropNames: PlasmicSearchIcon__ArgProps,
      internalVariantPropNames: PlasmicSearchIcon__VariantProps
    });

    const { dataFetches } = props;

    return PlasmicSearchIcon__RenderFunc({
      variants,
      args,
      overrides,
      dataFetches,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicSearchIcon";
  } else {
    func.displayName = `PlasmicSearchIcon.${nodeName}`;
  }
  return func;
}

export const PlasmicSearchIcon = Object.assign(
  // Top-level PlasmicSearchIcon renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements

    // Metadata about props expected for PlasmicSearchIcon
    internalVariantProps: PlasmicSearchIcon__VariantProps,
    internalArgProps: PlasmicSearchIcon__ArgProps
  }
);

export default PlasmicSearchIcon;
/* prettier-ignore-end */