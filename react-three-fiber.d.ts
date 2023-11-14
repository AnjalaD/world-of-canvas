import "@react-three/fiber";

declare module "@react-three/fiber" {
  export interface ThreeElements {
    /**
     * To this to work extend namespace
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
  }
}
