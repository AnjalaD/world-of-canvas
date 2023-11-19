import "@react-three/fiber";

declare module "@react-three/fiber" {
  export interface ThreeElements {
    /**
     * To this to work, three namespace should be extended with the following:
     *
     * ```
     * import { geometry } from "maath";
     * extend(geometry);
     * ```
     */
    roundedPlaneGeometry: Object3DNode<
      import("maath").geometry.RoundedPlaneGeometry,
      typeof import("maath").geometry.RoundedPlaneGeometry
    >;

    /**
     * To this to work, three namespace should be extended with the following:
     *
     * ```
     * import { Line } from "three";
     * extend({ ThreeLine: Line });
     * ```
     */
    threeLine: import("@react-three/fiber").Object3DNode<
      import("three").Line,
      typeof import("three").Line
    >;
  }
}
