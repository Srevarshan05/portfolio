declare module '*.glb' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

namespace JSX {
  interface IntrinsicElements {
    meshLineGeometry: any;
    meshLineMaterial: any;
  }
}

namespace React {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
    }
  }
}
